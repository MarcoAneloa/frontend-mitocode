import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Subject } from 'rxjs';
import { Rol } from '../_model/rol';

@Injectable({
    providedIn: 'root'
})
export class RolService {

    menuCambio = new Subject<Rol[]>();
    mensajeCambio = new Subject<string>();

    url: string = `${environment.HOST}/roles`;

    constructor(private http: HttpClient) { }

    listar() {
        return this.http.get<Rol[]>(`${this.url}`);
    }

    listarPorId(idRol: number) {
        return this.http.get<Rol>(`${this.url}/${idRol}`);
    }

    registrar(rol: Rol) {
        return this.http.post(this.url, rol);
    }

    modificar(rol: Rol) {
        return this.http.put(this.url, rol);
    }

    eliminar(idRol: number) {
        return this.http.delete(`${this.url}/${idRol}`);
    }
}