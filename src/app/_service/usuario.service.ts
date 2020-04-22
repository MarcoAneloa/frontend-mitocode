import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { Menu } from '../_model/menu';
import { Injectable } from '@angular/core';
import { UsuarioRolDTO } from '../_dto/usuarioRolDTO';
import { Usuario } from '../_model/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuarioCambio = new Subject<Usuario[]>();
  mensajeCambio = new Subject<string>();

  url: string = `${environment.HOST}/usuarios`;
  //url: string = `${environment.HOST}/${environment.MICRO_CR}/menus`;

  constructor(private http: HttpClient) { }

  listar() {
    let token = sessionStorage.getItem(environment.TOKEN_NAME);
    return this.http.get<Usuario[]>(`${this.url}`, {
      headers: new HttpHeaders().set('Authorization', `bearer ${token}`).set('Content-Type', 'application/json')
    });
  }

  listarPorId(idUsuario: number) {
    return this.http.get<Usuario>(`${this.url}/${idUsuario}`);
  }

  registrarUsuarioRol(usuarioRoles: UsuarioRolDTO[]) {
    return this.http.post(`${this.url}/roles`, usuarioRoles);
  }
}
