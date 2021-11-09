import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { Router } from '@angular/router';
declare const Swal

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  registroForm: FormGroup;
  loginForm: FormGroup;
  usuarioModel: UsuarioModel
  // loginModel: LoginModel
  mostrarContrasena: boolean = false;

  esRestringido: boolean = false;

  array = [
    {
      nombre: 'hola',
      email: 'esgarcia',
      tel: '1234567890'
    },
    {
      nombre: 'adios',
      email: 'erick@gmail.com',
      tel: '0987654321'
    }
  ]

  arrayTelefonos: any = []
  arrayDominios: any = []
  arrayEmpresas: any = []
  cargandoFiltros: boolean = true;
  private _id: string;

  constructor(private auth: AuthService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.inicializarRegistro();
    this.inicializarLogin();
    // let hola = this.generatePasswordRand()
    // console.log(hola);
    this.peticionFiltros()

  }

  peticionFiltros() {
    this.auth.obtenerDatosFiltro().subscribe(resp => {
      console.log(resp);

      this.arrayTelefonos = resp[0].telefonos
      this.arrayDominios = resp[0].dominios
      this.arrayEmpresas = resp[0].empresas
      console.log(this.arrayDominios, this.arrayTelefonos, this.arrayEmpresas);
      this.cargandoFiltros=false
    }, error => {
      console.log(error);
    })
  }

  inicializarRegistro() {

    this.registroForm = this.fb.group({
      nombre: [, [Validators.required]],
      apellido: [, [Validators.required]],
      empresa: [, [Validators.required]],
      telefono: [, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      email: [, [Validators.required, Validators.pattern(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/)]],
    })
  }

  inicializarLogin() {

    this.loginForm = this.fb.group({
      email: [, [Validators.required, Validators.pattern(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/)]],
      password: [, [Validators.required]]
    })
  }

  getErroresLogin(campo: string) {
    return this.loginForm.controls[campo].errors && this.loginForm.controls[campo].touched;
  }

  getErroresRegistro(campo: string) {
    return this.registroForm.controls[campo].errors && this.registroForm.controls[campo].touched;
  }

  async guardarRegistro() {
    if (this.registroForm.invalid) { this.registroForm.markAllAsTouched(); return }

    let telefonoFind = await this.arrayTelefonos.find(element => element == this.registroForm.value['telefono'])
    let empresaFind = await this.arrayEmpresas.find(element => element.toLowerCase() == this.registroForm.value['empresa'].toLowerCase())
    let dominioFind = await this.arrayDominios.find(element => this.registroForm.value['email'].includes(element.toLowerCase()) )

    console.log(telefonoFind);
    console.log(empresaFind);
    console.log(dominioFind);    

    if (telefonoFind || dominioFind || empresaFind) {
      Swal.fire({
        allowOutsideClick: false,
        icon: 'info',
        text: 'Guardando información'
      });
      Swal.showLoading();

      setTimeout(() => {

        this.auth.enviarEmailRestriccion(this.registroForm.value).subscribe(resp => {
          console.log(resp);
          Swal.close()
        }, error => {
          console.log(error);
        })

        this.esRestringido = true
        
      }, 4000);

      return

    }
    console.log(this.registroForm.value);

    const password = this.generatePasswordRand();
    console.log(password);

    Swal.fire({
      title: '¿Sus datos son correctos?',
      text: 'Se enviará un SMS a su número telefonico con los accesos para ingresar a IDR demo en línea',
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Aceptar'
    }).then(resp => {
      if (resp.value) {

        Swal.fire({
          allowOutsideClick: false,
          icon: 'info',
          text: 'Guardando información'
        });
        Swal.showLoading();
        this.usuarioModel = this.registroForm.value
        this.usuarioModel.password = password;

        this.auth.registro(this.usuarioModel).subscribe(next => {
          console.log(next);
          Swal.fire({
            title: 'Registrado correctamente',
            text: `¡Bienvenido ${this.usuarioModel.nombre}!, ingresa las credenciales que se te enviaron via SMS`,
            icon: 'success'
          })
        }, error => {
          console.log(error);
          console.log(error.error.includes('Email ya existe'));
          if (error.error.includes('Email ya existe')) {
            Swal.fire({
              title: 'Email ya existe',
              text: 'Este email ya ha sido registrado',
              icon: 'error',
              confirmButtonText: 'Aceptar'
            })
          }
        }, () => {
          this.registroForm.reset()
        })

      }
    })
  }

  generatePasswordRand(): string {
    let characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789()#$%@&*+!¡,-_¿?<>";

    var pass = "";
    for (let i = 0; i < 10; i++) {
      pass += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return pass;
  }

  iniciarSesion() {
    if (this.loginForm.invalid) { this.loginForm.markAllAsTouched(); return }
    console.log(this.loginForm.value);
    // return

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Autenticando credenciales'
    });
    Swal.showLoading();

    this.auth.iniciarSesion(this.loginForm.value).subscribe(next => {
      console.log(next);
      this._id = next['user']['id'];
      Swal.close()
    }, error => {
      console.log(error);
      Swal.fire({
        title: `${error.error.errors}`,
        text: `Ingrese correctamente sus credenciales`,
        icon: 'error',
        confirmButtonText: 'Aceptar'
      })
    }, () => {
      this.router.navigateByUrl(`/idr`);
    })
  }



}
