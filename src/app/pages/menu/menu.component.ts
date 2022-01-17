import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
declare const Swal;
declare const $: any;

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
    } else {
      this.token = localStorage.getItem('token');
      this._id = id;
      this.obtenerData()
    }

  }

  ngOnInit(): void {
    $("#carouselAnuncios").carousel();
  }

  obtenerData() {
    const id = localStorage.getItem('id')
    let resp = JSON.parse(localStorage.getItem('data'))

    if (!resp || this._id != id) {
      this.router.navigateByUrl('/login')
      return
    }

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

      this.datos = [...resp.datos]

      this.bloque = resp.bloque

      localStorage.setItem('data', JSON.stringify(resp))
      localStorage.setItem('anuncios', JSON.stringify(this.anuncios))

      this.cargando = false;
    }, error => {
      Swal.fire({
        title: `Su sesión ha caducado`,
        text: 'Vuelva a iniciar sesión',
        icon: 'info'
      })
      this.router.navigateByUrl('/login')

      console.log(error);
    }, () => {
    })
  }

  async cerrarSesion() {
    let cerrar = await this._auth.cerrarSesion()
    window.location.href = "https://sas-digital.com.mx/"
  }


}
