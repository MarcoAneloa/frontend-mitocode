import { Component, OnInit } from '@angular/core';
import { Menu } from '../../../_model/menu';
import { FormGroup, FormControl } from '@angular/forms';
import { MenuService } from '../../../_service/menu.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Rol } from '../../../_model/rol';
import { RolService } from '../../../_service/rol.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MenuRolDTO } from 'src/app/_dto/menuRolDTO';

@Component({
  selector: 'app-menu-rol-asignacion',
  templateUrl: './menu-rol-asignacion.component.html',
  styleUrls: ['./menu-rol-asignacion.component.css']
})
export class MenuRolAsignacionComponent implements OnInit {

  id: number;
  nombre: string;
  menu: Menu;
  form: FormGroup;
  edicion: boolean = false;
  roles: Rol[] = [];
  rolesAsignados: Rol[] = [];
  rolesSeleccionados: Rol[] = [];
  rolSeleccionado: Rol;

  mensaje: string;

  constructor(private menuService: MenuService,
    private route: ActivatedRoute, private router: Router, private rolService: RolService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.menu = new Menu();
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.initForm();
    });
  }

  initForm() {
    this.menuService.listarPorId(this.id).subscribe(data => {
      this.id = data.idMenu;
      this.nombre = data.nombre;
      this.rolesAsignados = data.roles;
      this.listarRoles();
    });
  }

  agregarRol() {
    if (this.rolSeleccionado) {
      let cont = 0;
      for (let i = 0; i < this.rolesSeleccionados.length; i++) {
        let rol = this.rolesSeleccionados[i];
        if (rol.idRol === this.rolSeleccionado.idRol) {
          cont++;
          break;
        }
      }
      if (cont > 0) {
        this.mensaje = `El rol se encuentra en la lista`;
        this.snackBar.open(this.mensaje, "Aviso", { duration: 2000 });
      } else {
        this.rolesSeleccionados.push(this.rolSeleccionado);
      }
    } else {
      this.mensaje = `Debe agregar un rol`;
      this.snackBar.open(this.mensaje, "Aviso", { duration: 2000 });
    }
  }

  limpiarControles() {
    this.rolesSeleccionados = [];
    this.rolSeleccionado = undefined;
    this.mensaje = '';
  }

  removerRol(index: number) {
    this.rolesSeleccionados.splice(index, 1);
  }

  listarRoles() {
    this.rolService.listar().subscribe(data => {
      if (this.rolesAsignados.length > 0) {
        let roles: Rol[] = data;
        for (let i = 0; i < roles.length; i++) {
          let igual = false;
          for (let j = 0; j < this.rolesAsignados.length; j++) {
            let roli = roles[i];
            let rolj = this.rolesAsignados[j];
            if (roli.idRol == rolj.idRol) {
              igual = true;
            }
          }
          if (!igual) this.roles.push(roles[i]);
        }
      } else {
        this.roles = data;
      }

    });
  }

  operar() {
    if (this.rolesSeleccionados.length > 0) {
      let menuRol = new MenuRolDTO();
      let menuRoles: MenuRolDTO[] = []
      for (let i = 0; i < this.rolesSeleccionados.length; i++) {
        menuRol.idMenu = this.id;
        menuRol.idRol = this.rolesSeleccionados[i].idRol;
        menuRoles.push(menuRol);
      }
      this.menuService.registrarMenuRol(menuRoles).subscribe(data => {
        this.router.navigate(['menurol']);
      });
      console.log(menuRoles);
    } else {
      this.mensaje = `Debe agregar un rol`;
      this.snackBar.open(this.mensaje, "Aviso", { duration: 2000 });
    }

  }
}
