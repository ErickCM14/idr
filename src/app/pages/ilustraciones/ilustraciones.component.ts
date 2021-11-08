import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-ilustraciones',
  templateUrl: './ilustraciones.component.html',
  styleUrls: ['./ilustraciones.component.css']
})
export class IlustracionesComponent implements OnInit {

  id: number;
  idUsuario: string
  path: string;
  lugar: any;

  datos = [
    {
      hotel1: {
        titulo: 'Bares',
        src: '../../../assets/carousel/bares.webp',
        alt: 'Bares'
      }
    },
    {
      hotel2: {
        titulo: 'Restaurante',
        src: '../../../assets/carousel/hoteles.webp',
        alt: 'Bares'
      }
    },
    {
      bar1: {
        titulo: 'Bares',
        src: '../../../assets/carousel/bares.webp',
        alt: 'Bares'
      }
    },
    {
      bar2: {
        titulo: 'Restaurante',
        src: '../../../assets/carousel/hoteles.webp',
        alt: 'Bares'
      }
    }
  ]

  imagenes = [
    {
      imagen: "../../../assets/respuestas/komoelpankasero.png",
      enlace: 'https://komoelpankasero.com/',
      id: 1
    },
    {
      imagen: "../../../assets/respuestas/viajes.png",
      enlace: '',
      id: 2
    },
    {
      imagen: "../../../assets/respuestas/hoteles.png",
      enlace: '',
      id: 3
    },
    {
      imagen: "../../../assets/respuestas/bancos.png",
      enlace: '',
      id: 4
    },
    {
      imagen: "../../../assets/respuestas/teatros.png",
      enlace: '',
      id: 5
    },
    {
      imagen: "../../../assets/respuestas/expos.png",
      enlace: '',
      id: 6
    },
    {
      imagen: "../../../assets/respuestas/bares.png",
      enlace: '',
      id: 7
    }
  ]
  anuncios: any;


  constructor(private route: ActivatedRoute, private _auth: AuthService) { }

  ngOnInit(): void {
    this.idUsuario = this.route.snapshot.paramMap.get('idUsuario');
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.path = this.route.snapshot.url[0].path;

    this.anuncios = JSON.parse(localStorage.getItem('anuncios'))
    console.log(this.anuncios);


    // this.lugar = this.datos.find(element =>
    //   Object.keys(element)[0] == this.id

    // )

    // this.lugar = Object.values(this.lugar)
    // console.log(this.lugar[0]);

    // console.log(Object.values(this.lugar) );

  }

  async cerrarSesion() {
    let cerrar = await this._auth.cerrarSesion()
    console.log(cerrar);
    window.location.href = "https://solucionesavanzadasyserviciosdigitales.com/"
  }

}
