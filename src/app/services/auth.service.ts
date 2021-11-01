import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { UsuarioModel } from '../models/usuario.model';
import { LoginModel } from '../models/login.model';
import { Observable, of } from 'rxjs';
import { MenuModel } from '../models/menu.model';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private registrar = `http://localhost:4001/v1/usuarios`;
  private login = `http://localhost:4001/v1/usuarios/entrar`;
  private idr = `http://localhost:4001/v1/idr/`;
  private urlCloudinary = "https://api.cloudinary.com/v1_1/idrenlinea/image/upload"

  headers: any;
  token: string;
  _id: string;
  valido: boolean = true;

  constructor(private http: HttpClient) {
    console.log('service');

    this.token = localStorage.getItem('token')
    this._id = localStorage.getItem('id')
    console.log(this._id, this.token);

    this.headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + this.token
    }
  }

  registro(usuario: UsuarioModel) {
    return this.http.post(this.registrar, usuario)
  }

  iniciarSesion(credenciales: LoginModel) {

    return this.http.post(this.login, credenciales)
      .pipe(map(resp => {

        this._id = resp['user']['id'];
        this.token = resp['user']['token'];
        localStorage.setItem('id', resp['user']['id']);
        localStorage.setItem('token', resp['user']['token']);
        localStorage.setItem('email', resp['user']['email']);

        return resp;
      }

      ))
  }

  guardarDatosIdr(datos: MenuModel) {
    return this.http.put(this.idr + this._id, datos, {
      headers: new HttpHeaders(this.headers)
    })

  }

  obtenerDatosIdr(id: string, token: string): Observable<any> {
    return this.http.get(this.idr + id, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + token
      })
    })
  }

  uploadImagen(data: any): Observable<any> {
    return this.http.post(this.urlCloudinary, data)
  }

  validarToken(): Observable<boolean>{
    
    return this.http.get(`${this.idr}validate`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + this.token
      }
    })
    .pipe(
      map(resp => true),
      catchError(error => of(false))
    )

  }

}
