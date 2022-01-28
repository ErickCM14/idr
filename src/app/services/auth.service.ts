import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UsuarioModel } from '../models/usuario.model';
import { LoginModel } from '../models/login.model';
import { Observable, of } from 'rxjs';
import { MenuModel } from '../models/menu.model';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private url = "https://idr-backend-c846inyxt-idr-enlinea.vercel.app/v1/"
  private url = "https://idr-backend.vercel.app/v1/"
  // private url = "http://localhost:4001/v1/"
  // private urlEmails = "http://localhost:3000/"
  private urlEmails = "https://idrenlinea2-api.herokuapp.com/"
  private urlEmails2 = "https://idrenlinea-api3.herokuapp.com/"
  private registrar = `${this.url}usuarios/`;
  private modificar = `${this.url}usuarios/modificar`;
  private login = `${this.url}usuarios/entrar`;
  // private emailRestringido = `${this.url}usuarios/usuario-restringido`;
  private idr = `${this.url}idr/`;
  private filtro = `${this.url}filtro/`;
  private urlCloudinary = "https://api.cloudinary.com/v1_1/idrenlinea/image/upload"
  private enviarEmail = `${this.urlEmails}enviar-email`
  private enviarEmail2 = `${this.urlEmails2}enviar-email`
  private enviarEmailRestringido = `${this.urlEmails}enviar-email-restringido`
  private enviarEmailRestringido2 = `${this.urlEmails2}enviar-email-restringido`
  private enviarAccesos = `${this.urlEmails}enviar-accesos`
  private enviarAccesos2 = `${this.urlEmails2}enviar-accesos`
  private enviarNuevaContrasena = `${this.urlEmails}enviar-nueva-contrasena`
  private enviarNuevaContrasena2 = `${this.urlEmails2}enviar-nueva-contrasena`
  private enviarDatos = `${this.urlEmails}enviar-datos`
  private enviarDatos2 = `${this.urlEmails2}enviar-datos`
  private enviarDatosLogin = `${this.urlEmails}enviar-inicio-sesion`
  private enviarDatosLogin2 = `${this.urlEmails2}enviar-inicio-sesion`

  headers: any;
  token: string;
  _id: string;
  valido: boolean = true;

  constructor(private http: HttpClient) {

    this.token = localStorage.getItem('token')
    this._id = localStorage.getItem('id')

    this.headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + this.token
    }
  }

  cerrarSesion() {
    return new Promise(resolve => {
      localStorage.removeItem('id');
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      localStorage.removeItem('anuncios');
      localStorage.removeItem('data');

      resolve(true)
    })
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
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + this.token
      }
    })

  }

  obtenerDatosIdr(id: string, token: string): Observable<any> {
    return this.http.get(this.idr + id, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + token
      }
    })
  }

  obtenerUsuario(id: string, token: string): Observable<any> {
    return this.http.get(this.registrar + id, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + token
      }
    })
  }

  obtenerDatosFiltro(): Observable<any> {
    return this.http.get(this.filtro)
  }

  modificarPassword(body:any){
    return this.http.put(this.modificar, body)
  }

  // enviarEmailRestriccion(body: any): Observable<any>{
  //   return this.http.post(this.emailRestringido, body)
  // }

  enviarEmailAccesos(body: any): Observable<any> {
    return this.http.post(this.enviarAccesos, body)
  }
  enviarEmailAccesos2(body: any): Observable<any> {
    return this.http.post(this.enviarAccesos2, body)
  }

  enviarEmailNuevaContrasena(body: any): Observable<any> {
    return this.http.post(this.enviarNuevaContrasena, body)
  }
  enviarEmailNuevaContrasena2(body: any): Observable<any> {
    return this.http.post(this.enviarNuevaContrasena2, body)
  }

  enviarEmailIngreso(body: any): Observable<any> {
    return this.http.post(this.enviarEmail, body)
  }
  enviarEmailIngreso2(body: any): Observable<any> {
    return this.http.post(this.enviarEmail2, body)
  }

  enviarEmailIngresoRestringido(body: any): Observable<any> {
    return this.http.post(this.enviarEmailRestringido, body)
  }
  enviarEmailIngresoRestringido2(body: any): Observable<any> {
    return this.http.post(this.enviarEmailRestringido2, body)
  }

  enviarDatosMenu(body: any): Observable<any>{
    return this.http.post(this.enviarDatos, body)
  }
  enviarDatosMenu2(body: any): Observable<any>{
    return this.http.post(this.enviarDatos2, body)
  }

  enviarDatosAccesosLogin(body: any): Observable<any>{
    return this.http.post(this.enviarDatosLogin, body)
  }
  enviarDatosAccesosLogin2(body: any): Observable<any>{
    return this.http.post(this.enviarDatosLogin2, body)
  }

  uploadImagen(data: any): Observable<any> {
    return this.http.post(this.urlCloudinary, data)
  }

  validarToken(): Observable<boolean> {

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
