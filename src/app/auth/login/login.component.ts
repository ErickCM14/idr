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
  
  mostrarContrasena: boolean = false;

  esRestringido: boolean = false;

  arrayTelefonos: any = []
  arrayDominios: any = []
  arrayEmpresas: any = []
  cargandoFiltros: boolean = true;
  private _id: string;
  politicasBoolean: boolean = true;

  constructor(private auth: AuthService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.inicializarRegistro();
    this.inicializarLogin();
    this.peticionFiltros()

  }

  peticionFiltros() {
    this.auth.obtenerDatosFiltro().subscribe(resp => {
      this.arrayTelefonos = resp[0].telefonos
      this.arrayDominios = resp[0].dominios
      this.arrayEmpresas = resp[0].empresas
      this.cargandoFiltros = false
    }, error => {
      console.log(error);
    })
  }

  inicializarRegistro() {

    this.registroForm = this.fb.group({
      nombre: [, [Validators.required]],
      apellido: [, [Validators.required]],
      empresa: [, [Validators.required]],
      telefono: [, [Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^[0-9]\d*$/)]],
      telefono2: [, [Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^[0-9]\d*$/)]],
      email: [, [Validators.required, Validators.pattern(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/)]],
      lada: ['+52',],
      lada2: [,],
      politicas: [,]
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

  cambioCheck(event: any) {
    if (event.target.checked) {
      this.politicasBoolean = true;
    } else {
      this.politicasBoolean = false;
    }
  }

  async guardarRegistro() {

    if (this.registroForm.invalid) { this.registroForm.markAllAsTouched();

      if (!this.registroForm.value.politicas) {
        this.politicasBoolean = false;
      }

      return;
    }

    if (!this.registroForm.value.politicas) {
      this.politicasBoolean = false;
      return;
    }

    this.politicasBoolean = true;

    let telefonoFind = await this.arrayTelefonos.find(element => element == this.registroForm.value['telefono'])
    let empresaFind = await this.arrayEmpresas.find(element => element.toLowerCase() == this.registroForm.value['empresa'].toLowerCase())
    let emailFind = await this.arrayDominios.find(element => this.registroForm.value['email'].includes(element.toLowerCase()))

    if (telefonoFind || empresaFind || emailFind) {
      Swal.fire({
        allowOutsideClick: false,
        icon: 'info',
        text: 'Guardando información'
      });
      Swal.showLoading();

      this.auth.enviarEmailIngresoRestringido(this.registroForm.value).subscribe(resp => {

      }, error => {
        console.log(error);
        this.auth.enviarEmailIngresoRestringido2(this.registroForm.value).subscribe(resp => {

        }, error => {
          console.log(error);
        })
      })

      setInterval(() => {
        this.esRestringido = true
        Swal.close()
      }, 4000)

      return

    }

    const password = this.generatePasswordRand();
    // console.log(password);

    Swal.fire({
      title: '¿Sus datos son correctos?',
      text: 'Se enviará un email a su correo electrónico con los accesos para ingresar a IDR demo en línea',
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

        let lada = this.registroForm.value['lada']
        let lada2 = this.registroForm.value['lada2']
        delete this.registroForm.value['lada']
        delete this.registroForm.value['lada2']
        delete this.registroForm.value['politicas']
        this.usuarioModel = this.registroForm.value
        let telefono = lada + this.registroForm.value['telefono']
        let telefono2 = lada2 + this.registroForm.value['telefono2']
        this.usuarioModel.telefono = telefono
        this.usuarioModel.telefono2 = telefono2
        this.usuarioModel.password = password;

        this.auth.registro(this.usuarioModel).subscribe(next => {

          this.auth.enviarEmailIngreso(this.usuarioModel).subscribe(resp => {
            // console.log(resp);
            this.auth.enviarEmailAccesos(this.usuarioModel).subscribe(resp => {
              // console.log(resp);
              Swal.fire({
                title: 'Registrado correctamente',
                text: `¡Bienvenido ${this.usuarioModel.nombre}!, ingresa las credenciales que se te enviaron via correo, revisa tu bandeja de entrada, promociones o spam`,
                icon: 'success'
              })
            }, error => {
              console.log(error);
              Swal.close()
            })
          }, error => {
            // console.log(error);
            this.auth.enviarEmailIngreso2(this.usuarioModel).subscribe(resp => {

              this.auth.enviarEmailAccesos2(this.usuarioModel).subscribe(resp => {
                // console.log(resp);
                Swal.fire({
                  title: 'Registrado correctamente',
                  text: `¡Bienvenido ${this.usuarioModel.nombre}!, ingresa las credenciales que se te enviaron via correo, revisa tu bandeja de entrada, promociones o spam`,
                  icon: 'success'
                })
              }, error => {
                console.log(error);
                Swal.close()
              })
            })

          })

        }, error => {
          Swal.close()
          console.log(error);
          if (error.error.includes('Email ya existe')) {
            Swal.fire({
              title: 'Email ya existe',
              text: 'Este email ya ha sido registrado',
              icon: 'error',
              confirmButtonText: 'Aceptar'
            })
          }
        }, () => {
          this.registroForm.reset({
            lada: '+52'
          })
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

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Autenticando credenciales'
    });
    Swal.showLoading();

    this.auth.iniciarSesion(this.loginForm.value).subscribe(next => {
      this._id = next['user']['id'];
      
      this.auth.obtenerUsuario(this._id, localStorage.getItem('token')).subscribe(resp => {
        localStorage.setItem('usuario-sas', JSON.stringify(resp))
      })
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
