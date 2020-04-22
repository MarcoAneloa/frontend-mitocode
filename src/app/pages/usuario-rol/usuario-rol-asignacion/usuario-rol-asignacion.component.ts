import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../_model/usuario';
import { FormGroup, FormControl } from '@angular/forms';
import { UsuarioService } from '../../../_service/usuario.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Rol } from '../../../_model/rol';
import { RolService } from '../../../_service/rol.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsuarioRolDTO } from '../../../_dto/usuarioRolDTO';

@Component({
  selector: 'app-usuario-rol-asignacion',
  templateUrl: './usuario-rol-asignacion.component.html',
  styleUrls: ['./usuario-rol-asignacion.component.css']
})
export class UsuarioRolAsignacionComponent implements OnInit {

  id: number;
  username: string;
  usuario: Usuario;
  form: FormGroup;
  edicion: boolean = false;
  roles: Rol[] = [];
  rolesAsignados: Rol[] = [];
  rolesSeleccionados: Rol[] = [];
  rolSeleccionado: Rol;

  mensaje: string;

  constructor(private usuarioService: UsuarioService,
    private route: ActivatedRoute, private router: Router, private rolService: RolService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.usuario = new Usuario();
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.initForm();
    });
  }

  initForm() {
    this.usuarioService.listarPorId(this.id).subscribe(data => {
      this.id = data.idUsuario;
      this.username = data.username;
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
      let usuarioRol = new UsuarioRolDTO();
      let usuarioRoles: UsuarioRolDTO[] = []
      for (let i = 0; i < this.rolesSeleccionados.length; i++) {
        usuarioRol.idUsuario = this.id;
        usuarioRol.idRol = this.rolesSeleccionados[i].idRol;
        usuarioRoles.push(usuarioRol);
      }
      this.usuarioService.registrarUsuarioRol(usuarioRoles).subscribe(data => {
        this.router.navigate(['usuariorol']);
      });
      console.log(usuarioRoles);
    } else {
      this.mensaje = `Debe agregar un rol`;
      this.snackBar.open(this.mensaje, "Aviso", { duration: 2000 });
    }

  }
}
