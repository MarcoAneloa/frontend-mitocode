import { Component, OnInit } from '@angular/core';
import { Menu } from '../../../_model/menu';
import { FormGroup, FormControl } from '@angular/forms';
import { MenuService } from '../../../_service/menu.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-menu-edicion',
  templateUrl: './menu-edicion.component.html',
  styleUrls: ['./menu-edicion.component.css']
})
export class MenuEdicionComponent implements OnInit {

  id: number;
  menu: Menu;
  form: FormGroup;
  edicion: boolean = false;

  constructor(private menuService: MenuService,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    this.menu = new Menu();

    this.form = new FormGroup({
      'id': new FormControl(0),
      'nombre': new FormControl(''),
      'icono': new FormControl(''),
      'url': new FormControl('')
    });

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = params['id'] != null;
      this.initForm();
    });
  }

  initForm() {
    if (this.edicion) {
      this.menuService.listarPorId(this.id).subscribe(data => {
        let id = data.idMenu;
        let nombre = data.nombre;
        let icono = data.icono;
        let url = data.url;
        this.form = new FormGroup({
          'id': new FormControl(id),
          'nombre': new FormControl(nombre),
          'icono': new FormControl(icono),
          'url': new FormControl(url)
        });
      });
    }
  }
  
  operar() {
    this.menu.idMenu = this.form.value['id'];
    this.menu.nombre = this.form.value['nombre'];
    this.menu.icono = this.form.value['icono'];
    this.menu.url = this.form.value['url'];

    if (this.menu != null && this.menu.idMenu > 0) {
      //BUENA PRACTICA
      this.menuService.modificar(this.menu).pipe(switchMap(() => {
        return this.menuService.listar();
      })).subscribe(data => {
        this.menuService.menuCambio.next(data);
        this.menuService.mensajeCambio.next("Se modificó");
      });

    } else {
      this.menuService.registrar(this.menu).subscribe(data => {
        this.menuService.listar().subscribe(menu => {
          this.menuService.menuCambio.next(menu);
          this.menuService.mensajeCambio.next("Se registró");
        });
      });
    }

    this.router.navigate(['menu']);
  }
}
