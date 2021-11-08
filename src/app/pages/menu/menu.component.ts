import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
declare const Swal;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  redes: [
    {
      img: "../../../assets/redes-sociales/Facebook.png"
    },
    {
      img: "../../../assets/redes-sociales/Instagram.png"
    },
    {
      img: "../../../assets/redes-sociales/Twitter.png"
    },
    {
      img: "../../../assets/redes-sociales/Youtube.png"
    },
    {
      img: "../../../assets/redes-sociales/IVR.png"
    }
  ]

  //No sirven estas dos

  // id: string;
  _id: string;
  token: string;

  datos = []
  anuncios = []
  bloque = 0
  cargando: boolean = true;

  constructor(private route: ActivatedRoute, private _auth: AuthService, private router: Router) {
    // [routerLink]="['/productividad']" [queryParams] = " { id: element.id, productividad: element.productividad, mes: this.mesProductividad, anio: this.anioProductividad } "
    const queryParams = this.route.queryParams['_value'];
    const id = this.route.snapshot.paramMap.get('id');
    if (queryParams.token) {
      this.token = queryParams.token;
      this._id = id;
      localStorage.setItem('token', this.token)
      localStorage.setItem('id', id)
      this.ejecutarPeticion()
      console.log("Entro a tener queryparamas");
    } else {
      this.token = localStorage.getItem('token');
      this._id = id;
      console.log(this._id)
      console.log("No tiene queryparamas");
      console.log(this.token);
      this.obtenerData()
    }

  }

  ngOnInit(): void { }

  obtenerData() {
    const id = localStorage.getItem('id')
    console.log(id);
    
    let resp = JSON.parse(localStorage.getItem('data'))
    console.log(resp);
    
    if (!resp || this._id != id) {
      this.router.navigateByUrl('/login')
      return
    }
    console.log(id)
    console.log(this._id)
    this.anuncios = [...resp.anuncios]
    this.datos = [...resp.datos]
    this.bloque = resp.bloque
    this.cargando = false;
  }

  ejecutarPeticion() {
    this._auth.obtenerDatosIdr(this._id, this.token).subscribe(resp => {
      if (!resp) {
        Swal.fire({
          title: `No tiene permisos`,
          text: 'Vuelva a iniciar sesión',
          icon: 'info'
        })
        this.router.navigateByUrl('/login')
        return
      }
      this.anuncios = [...resp.anuncios]
      console.log(resp);
      console.log(resp.datos);
      console.log(resp.anuncios);

      this.datos = [...resp.datos]

      this.bloque = resp.bloque

      console.log(this.datos);
      console.log(this.datos[0].resp[0].id);

      console.log(this.anuncios);


      localStorage.setItem('data', JSON.stringify(resp))
      localStorage.setItem('anuncios', JSON.stringify(this.anuncios))

      this.cargando = false;
    }, error => {
      console.log("Mandar un mensaje de que no exite o el token ha venciod y redirirlo a la una página para que cree u menu");
      Swal.fire({
        title: `Su sesión ha caducado`,
        text: 'Vuelva a iniciar sesión',
        icon: 'info'
      })
      this.router.navigateByUrl('/login')

      console.log(error);
    })
  }

  async cerrarSesion() {
    let cerrar = await this._auth.cerrarSesion()
    console.log(cerrar);
    window.location.href = "https://solucionesavanzadasyserviciosdigitales.com/"
  }


}
