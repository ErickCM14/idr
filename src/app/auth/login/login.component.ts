import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioModel } from 'src/app/models/usuario.model';
// import Swal from 'sweetalert2';
import { Router } from '@angular/router';

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
  private _id: string;

  constructor(private auth: AuthService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.inicializarRegistro();
    this.inicializarLogin();
    // let hola = this.generatePasswordRand()
    // console.log(hola);

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

  guardarRegistro() {
    if (this.registroForm.invalid) { this.registroForm.markAllAsTouched(); return }

    if (this.registroForm.value['email'].indexOf('s10plus') != '-1' || this.registroForm.value['email'].indexOf('garceislas') != '-1' || this.registroForm.value['email'].indexOf('carial') != '-1') {

      console.log(this.registroForm.value['email'].indexOf('s10plus'));
      this.esRestringido = true
      return;
    }
    this.esRestringido = false

   let emailFind =  this.array.find(element => element.email == this.registroForm.value['email'] || element.tel == this.registroForm.value['telefono'])
  //  let telFind =  this.array.find(element => element.tel == this.registroForm.value['telefono'] )

    console.log(emailFind);
    // console.log(telFind);
    if(emailFind){
      console.log("hay algo");
    }else{
      console.log("no hay");
    }
    


    // this.registroForm.value['telefono'] = this.registroForm.value['prefijo'] + this.registroForm.value['telefono']
    // delete this.registroForm.value['prefijo']

    console.log(this.registroForm.value);


    const password = this.generatePasswordRand();
    console.log(password);

    // return;

    // Swal.fire({
    //   title: '¿Sus datos son correctos?',
    //   text: 'Se enviará un SMS a su número telefonico con los accesos para ingresar a IDR demo en línea',
    //   icon: 'question',
    //   showConfirmButton: true,
    //   showCancelButton: true,
    //   cancelButtonText: 'Cancelar',
    //   confirmButtonText: 'Aceptar'
    // }).then(resp => {
    //   if (resp.value) {

    //     Swal.fire({
    //       allowOutsideClick: false,
    //       icon: 'info',
    //       text: 'Guardando información'
    //     });
    //     Swal.showLoading();
    //     this.usuarioModel = this.registroForm.value
    //     this.usuarioModel.password = password;

        this.auth.registro(this.usuarioModel).subscribe(next => {
          console.log(next);
          // Swal.fire({
          //   title: 'Registrado correctamente',
          //   text: `¡Bienvenido ${this.usuarioModel.nombre}!, ingresa las credenciales que se te enviaron via SMS`,
          //   icon: 'success'
          // })
        }, error => {
          console.log(error);
          console.log(error.error.includes('Email ya existe'));
          if (error.error.includes('Email ya existe')) {
            // Swal.fire({
            //   title: 'Email ya existe',
            //   text: 'Este email ya ha sido registrado',
            //   icon: 'error',
            //   confirmButtonText: 'Aceptar'
            // })
          }
        }, () => {
          this.registroForm.reset()
        })

      // }
    // })
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

    // Swal.fire({
    //   allowOutsideClick: false,
    //   icon: 'info',
    //   text: 'Autenticando credenciales'
    // });
    // Swal.showLoading();

    this.auth.iniciarSesion(this.loginForm.value).subscribe(next => {
      console.log(next);
      this._id = next['user']['id'];
      // Swal.close()
    }, error => {
      console.log(error);
      // Swal.fire({
      //   title: `${error.error.errors}`,
      //   text: `Ingrese correctamente sus credenciales`,
      //   icon: 'error',
      //   confirmButtonText: 'Aceptar'
      // })
    }, () => {
      this.router.navigateByUrl(`/idr`);
    })
  }



}
