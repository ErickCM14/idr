import { Component, HostListener, OnInit } from '@angular/core';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { AuthService } from 'src/app/services/auth.service';
import { concatMap, mergeMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { MenuModel } from 'src/app/models/menu.model';
import { ActivatedRoute, Router, RouterLinkActive } from '@angular/router';
declare const Swal;
declare const $: any;

@Component({
  selector: 'app-create-app',
  templateUrl: './create-app.component.html',
  styleUrls: ['./create-app.component.css']
})
export class CreateAppComponent implements OnInit {


  //Colores en Hex y RGB
  a: string = '#0000C8';
  b: string = '0,0,255';
  anuncio4: number = 0;
  posicionAnuncio4: any;
  fileImagen: any;
  fileImagenSubir: any;
  menuModel: MenuModel = new MenuModel;
  urlQR: string;
  booleanQR: boolean = false;
  element: string = "url";

  _id: string;
  token: string;

  btnDrag1 = [
    {
      // icon: "../../../assets/botones/btn2/economia-circular-2.png",
      // imagen: "../../../assets/botones/btn3/bancos.png",
      imagen: "../../../assets/botones/btn1y2/bancos.png",
      imagen2: "../../../assets/botones/btn1y2/bancos.png",
      imagen3: "../../../assets/botones/btn3/bancos.png",
      icon: "fas fa-dollar-sign",
      texto: 'Bancos',
      bg: 'blue',
      color: 'white',
    },
    {
      // imagen: "../../../assets/botones/btn3/viajes.png",
      imagen: "../../../assets/botones/btn1y2/viajes.png",
      imagen2: "../../../assets/botones/btn1y2/viajes.png",
      imagen3: "../../../assets/botones/btn3/viajes.png",
      icon: "fas fa-plane",
      texto: 'Viajes',
      bg: 'blue',
      color: 'white',
    },
    {
      // icon: "../../../assets/botones/btn2/hoteles.png",
      // imagen: "../../../assets/botones/btn3/hoteles.png",
      imagen: "../../../assets/botones/btn1y2/hoteles.png",
      imagen2: "../../../assets/botones/btn1y2/hoteles-1.png",
      imagen3: "../../../assets/botones/btn3/hoteles.png",
      icon: "fas fa-hotel",
      texto: 'Hoteles',
      bg: 'blue',
      color: 'white',
    },
    {
      // icon: "../../../assets/botones/btn2/restaurantes.png",
      // imagen: "../../../assets/botones/btn3/restaurantes.png",
      imagen: "../../../assets/botones/btn1y2/restaurantes.png",
      imagen2: "../../../assets/botones/btn1y2/restaurantes.png",
      imagen3: "../../../assets/botones/btn3/restaurantes.png",
      icon: "fas fa-utensils",
      texto: 'Restaurant',
      bg: 'blue',
      color: 'white',
    },
    {
      // imagen: "../../../assets/botones/btn3/eventos.png",
      imagen: "../../../assets/botones/btn1y2/eventos.png",
      imagen2: "../../../assets/botones/btn1y2/eventos-1.png",
      imagen3: "../../../assets/botones/btn3/eventos.png",
      icon: "fas fa-theater-masks",
      texto: 'Eventos',
      bg: 'blue',
      color: 'white',
    },
    {
      // icon: "../../../assets/botones/btn2/bares.png",
      // imagen: "../../../assets/botones/btn3/bares.png",
      imagen: "../../../assets/botones/btn1y2/bares.png",
      imagen2: "../../../assets/botones/btn1y2/bares-1.png",
      imagen3: "../../../assets/botones/btn3/bares.png",
      icon: "fas fa-glass-martini-alt",
      texto: 'Bares',
      bg: 'blue',
      color: 'white',
    }
  ]

  btnDrag2 = [
    {
      // icon: "../../../assets/botones/btn2/icons8-banco-100.png",
      // imagen: "../../../assets/botones/btn3/bancos.png",
      imagen: "../../../assets/botones/btn1y2/bancos.png",
      imagen2: "../../../assets/botones/btn1y2/bancos.png",
      imagen3: "../../../assets/botones/btn3/bancos.png",
      icon: "fas fa-dollar-sign",
      texto: 'Bancos',
      bg: 'blue',
      color: 'white',
    },
    {
      // imagen: "../../../assets/botones/btn3/viajes.png",
      imagen: "../../../assets/botones/btn1y2/viajes.png",
      imagen2: "../../../assets/botones/btn1y2/viajes.png",
      imagen3: "../../../assets/botones/btn3/viajes.png",
      icon: "fas fa-plane",
      texto: 'Viajes',
      bg: 'blue',
      color: 'white',
    },
    {
      // icon: "../../../assets/botones/btn2/hoteles.png",
      // imagen: "../../../assets/botones/btn3/hoteles.png",
      imagen: "../../../assets/botones/btn1y2/hoteles.png",
      imagen2: "../../../assets/botones/btn1y2/hoteles-1.png",
      imagen3: "../../../assets/botones/btn3/hoteles.png",
      icon: "fas fa-hotel",
      texto: 'Hoteles',
      bg: 'blue',
      color: 'white',
    },
    {
      // icon: "../../../assets/botones/btn2/restaurantes.png",
      // imagen: "../../../assets/botones/btn3/restaurantes.png",
      imagen: "../../../assets/botones/btn1y2/restaurantes.png",
      imagen2: "../../../assets/botones/btn1y2/restaurantes.png",
      imagen3: "../../../assets/botones/btn3/restaurantes.png",
      icon: "fas fa-utensils",
      texto: 'Restaurant',
      bg: 'blue',
      color: 'white',
    },
    {
      // imagen: "../../../assets/botones/btn3/eventos.png",
      imagen: "../../../assets/botones/btn1y2/eventos.png",
      imagen2: "../../../assets/botones/btn1y2/eventos-1.png",
      imagen3: "../../../assets/botones/btn3/eventos.png",
      icon: "fas fa-theater-masks",
      texto: 'Eventos',
      bg: 'blue',
      color: 'white',
    },
    {
      // icon: "../../../assets/botones/btn2/bares.png",
      // imagen: "../../../assets/botones/btn3/bares.png",
      imagen: "../../../assets/botones/btn1y2/bares.png",
      imagen2: "../../../assets/botones/btn1y2/bares-1.png",
      imagen3: "../../../assets/botones/btn3/bares.png",
      icon: "fas fa-glass-martini-alt",
      texto: 'Bares',
      bg: 'blue',
      color: 'white',
    }
  ]


  btnDrag3 = [
    {
      // imagen: "../../../assets/botones/btn3/bancos.png",
      imagen: "../../../assets/botones/btn1y2/bancos.png",
      imagen2: "../../../assets/botones/btn1y2/bancos.png",
      imagen3: "../../../assets/botones/btn3/bancos.png",
      icon: "fas fa-dollar-sign",
      texto: 'Bancos',
      bg: 'blue',
      color: 'white',
    },
    {
      // imagen: "../../../assets/botones/btn3/viajes.png",
      imagen: "../../../assets/botones/btn1y2/viajes.png",
      imagen2: "../../../assets/botones/btn1y2/viajes.png",
      imagen3: "../../../assets/botones/btn3/viajes.png",
      icon: "fas fa-plane",
      texto: 'Viajes',
      bg: 'blue',
      color: 'white',
    },
    {
      // imagen: "../../../assets/botones/btn3/hoteles.png",
      imagen: "../../../assets/botones/btn1y2/hoteles.png",
      imagen2: "../../../assets/botones/btn1y2/hoteles-1.png",
      imagen3: "../../../assets/botones/btn3/hoteles.png",
      icon: "fas fa-hotel",
      texto: 'Hoteles',
      bg: 'blue',
      color: 'white',
    },
    {
      // imagen: "../../../assets/botones/btn3/restaurantes.png",
      imagen: "../../../assets/botones/btn1y2/restaurantes.png",
      imagen2: "../../../assets/botones/btn1y2/restaurantes.png",
      imagen3: "../../../assets/botones/btn3/restaurantes.png",
      icon: "fas fa-utensils",
      texto: 'Restaurant',
      bg: 'blue',
      color: 'white',
    },
    {
      // imagen: "../../../assets/botones/btn3/eventos.png",
      imagen: "../../../assets/botones/btn1y2/eventos.png",
      imagen2: "../../../assets/botones/btn1y2/eventos-1.png",
      imagen3: "../../../assets/botones/btn3/eventos.png",
      icon: "fas fa-theater-masks",
      texto: 'Eventos',
      bg: 'blue',
      color: 'white',
    },
    {
      // imagen: "../../../assets/botones/btn3/bares.png",
      imagen: "../../../assets/botones/btn1y2/bares.png",
      imagen2: "../../../assets/botones/btn1y2/bares-1.png",
      imagen3: "../../../assets/botones/btn3/bares.png",
      icon: "fas fa-glass-martini-alt",
      texto: 'Bares',
      bg: 'blue',
      color: 'white',
    }
  ]



  botonesDrop = [
    {
      bg: 'blue',
      resp: []
    },
    {
      bg: 'blue',
      resp: []
    },
    {
      bg: 'blue',
      resp: []
    },
    {
      bg: 'blue',
      resp: []
    },
    {
      bg: '#dcdcdc'
    },
    {
      bg: '#dcdcdc'
    },
    {
      bg: '#dcdcdc'
    },
    {
      bg: '#dcdcdc'
    }
  ]


  botonesDrop2 = [
    {
      bg: 'blue',
      resp: []
    },
    {
      bg: 'blue',
      resp: []
    },
    {
      bg: 'blue',
      resp: []
    },
    {
      bg: '#dcdcdc'
    },
    {
      bg: 'blue',
      resp: []
    },
    {
      bg: '#dcdcdc'
    },
    {
      bg: '#dcdcdc'
    },
    {
      bg: '#dcdcdc'
    },
    {
      bg: '#dcdcdc'
    },
    {
      bg: '#dcdcdc'
    },
    {
      bg: '#dcdcdc'
    },
    {
      bg: '#dcdcdc'
    }
  ]

  botonesDrop3 = [
    {
      bg: 'blue',
      resp: []
    },
    {
      bg: '#dcdcdc'
    },
    {
      bg: 'blue',
      resp: []
    },
    {
      bg: '#dcdcdc'
    },
    {
      bg: '#dcdcdc'
    },
    {
      bg: '#dcdcdc'
    },
    {
      bg: 'blue',
      resp: []
    },
    {
      bg: 'blue',
      resp: []
    },
    {
      bg: '#dcdcdc'
    },
    {
      bg: '#dcdcdc'
    }
  ]

  botonesDrop4 = [
    {
      bg: 'blue',
      resp: []
    },
    {
      bg: 'blue',
      resp: []
    },
    {
      bg: 'blue',
      resp: []
    },
    {
      bg: '#dcdcdc'
    },
    {
      bg: 'blue',
      resp: []
    },
    {
      bg: '#dcdcdc'
    }
  ]

  respuestasDrag = [
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

  respuestasDrop1 = [
    {
      texto: '',
    },
    {
      texto: ''
    },
    {
      texto: ''
    },
    {
      texto: ''
    }
  ]

  respuestasDrop2 = [
    {
      texto: '',
    },
    {
      texto: ''
    },
    {
      texto: ''
    },
    {
      texto: ''
    }
  ]

  respuestasDrop3 = [
    {
      texto: '',
    },
    {
      texto: ''
    },
    {
      texto: ''
    },
    {
      texto: ''
    }
  ]

  respuestasDrop4 = [
    {
      texto: '',
    },
    {
      texto: ''
    },
    {
      texto: ''
    },
    {
      texto: ''
    }
  ]

  anunciosDrag = [
    {
      imagen: "../../../assets/anuncios/ropa.png",
      id: 1
    },
    {
      imagen: "../../../assets/anuncios/hotel.png",
      id: 2
    },
    {
      imagen: "../../../assets/anuncios/golf.png",
      id: 3
    },
    {
      imagen: "../../../assets/anuncios/anunciese.png",
      id: 4
    },
    {
      imagen: "../../../assets/anuncios/komoelpankasero.png",
      id: 5
    },
    {
      imagen: "../../../assets/anuncios/auto.png",
      id: 6
    },
    {
      imagen: "../../../assets/anuncios/gym.png",
      id: 7
    },
    {
      imagen: "../../../assets/anuncios/salon.png",
      id: 8
    }
  ]

  anunciosDrop = [
    {
      imagen: "../../../assets/anuncios/anunciese.png",
      id: 0
    },
    {
      imagen: "../../../assets/anuncios/anunciese.png",
      id: 0
    },
    {
      imagen: "../../../assets/anuncios/anunciese.png",
      id: 0
    },
    {
      imagen: "../../../assets/anuncios/anunciese.png",
      id: 0
    },
  ]

  anunciosAuxiliarDrop = [
    {
      imagen: "",
    },
    {
      imagen: "",
    },
    {
      imagen: "",
    },
    {
      imagen: "",
    },
  ]

  bloque1: boolean = false
  bloque2: boolean = false
  bloque3: boolean = false
  bloque4: boolean = false
  sinBloque: boolean = true;

  esMovil: boolean = false;

  scrHeight: any;
  scrWidth: any;

  datosUsuario: any

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.scrHeight = window.innerHeight;
    this.scrWidth = window.innerWidth;
  }

  constructor(private _auth: AuthService, private toastr: ToastrService, private route: ActivatedRoute, private router: Router ) {
    this._id = localStorage.getItem('id')
    this.token = localStorage.getItem('token')

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      this.esMovil = true;
    }

    this.datosUsuario = JSON.parse(localStorage.getItem('usuario-sas'))
  }

  ngOnInit(): void {
    $("#carouselAnunciosDemo").carousel();
    this.getScreenSize()
  }

  hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (result) {
      var r = parseInt(result[1], 16);
      var g = parseInt(result[2], 16);
      var b = parseInt(result[3], 16);
      return r + "," + g + "," + b;//return 23,14,45 -> reformat if needed 
    }
    return null;
  }

  rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  cambioColor(event: any) {
    let colorRGB = this.hexToRgb(event.target.value)
    this.a = event.target.value
    this.b = colorRGB;
  }

  datoBoton(boton: any, i: any, event: any) {

    boton.bg = this.a

    event.target.style.backgroundColor = this.a

    let r = parseInt(this.b.split(',')[0])
    let g = parseInt(this.b.split(',')[1])
    let b = parseInt(this.b.split(',')[2])
    let contraste = ((r * 299) + (g * 587) + (b * 114)) / 1000;

    if (contraste >= 128) {
      event.target.style.color = 'black'
      boton.color = 'black';
    } else {
      event.target.style.color = 'white';
      boton.color = 'white';
    }
  }


  //Selecciona el bloque de diseño a mostrar
  bloque(num: any) {

    switch (num) {
      case 1:
        this.bloque1 = true
        this.bloque2 = false
        this.bloque3 = false
        this.bloque4 = false
        this.sinBloque = false
        break;
      case 2:
        this.bloque1 = false
        this.bloque2 = true
        this.bloque3 = false
        this.bloque4 = false
        this.sinBloque = false
        break;
      case 3:
        this.bloque1 = false
        this.bloque2 = false
        this.bloque3 = true
        this.bloque4 = false
        this.sinBloque = false
        break;
      case 4:
        this.bloque1 = false
        this.bloque2 = false
        this.bloque3 = false
        this.bloque4 = true
        this.sinBloque = false
        break;
      default: break;
    }

  }



  drop(event: CdkDragDrop<string[]>) {
    //Guardara el valor del objeto btnDrag que corresponde a los botones que se arrastran
    let botones = "";

    if (event.previousContainer.id == "cdk-drop-list-0" || event.previousContainer.id == "cdk-drop-list-1" || event.previousContainer.id == "cdk-drop-list-2") {
    } else {
      return;
    }

    if (event.currentIndex >= 4) {
      return;
    }

    if (event.previousContainer.id.includes('0')) {
      botones = 'btnDrag1'
    }
    if (event.previousContainer.id.includes('1')) {
      botones = 'btnDrag2'
    }
    if (event.previousContainer.id.includes('2')) {
      botones = 'btnDrag3'
    }

    //Obtiene las respuestas anteriores que se pusieron en el boton correspondiente
    const respuestasAnterior = event.container.data[event.currentIndex]['resp'];

    if (event.previousContainer === event.container) {
      return;
    } else {


      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);

      const iconoAnterior = event.container.data[event.currentIndex]['icon'];
      const textoAnterior = event.container.data[event.currentIndex]['texto'];
      const bgAnterior = event.container.data[event.currentIndex]['bg'];
      const colorAnterior = event.container.data[event.currentIndex]['color'];
      const imagenAnterior = event.container.data[event.currentIndex]['imagen'];
      const imagen2Anterior = event.container.data[event.currentIndex]['imagen2'];
      const imagen3Anterior = event.container.data[event.currentIndex]['imagen3'];

      this[`${botones}`].splice(event.previousIndex, 0, { icon: `${iconoAnterior}`, texto: `${textoAnterior}`, bg: `${bgAnterior}`, color: `${colorAnterior}`, imagen: `${imagenAnterior}`, imagen2: `${imagen2Anterior}`, imagen3: `${imagen3Anterior}` });

      this.botonesDrop[event.currentIndex].resp = respuestasAnterior;

      this.botonesDrop.splice(event.currentIndex + 1, 1)

    }

  }

  drop2(event: CdkDragDrop<string[]>, i: any) {
    let botones = "";

    if (event.previousContainer.id == "cdk-drop-list-0" || event.previousContainer.id == "cdk-drop-list-1" || event.previousContainer.id == "cdk-drop-list-2") {
    } else {
      return;
    }

    if (event.previousContainer.id.includes('0')) {
      botones = 'btnDrag1'
    }
    if (event.previousContainer.id.includes('1')) {
      botones = 'btnDrag2'
    }
    if (event.previousContainer.id.includes('2')) {
      botones = 'btnDrag3'
    }

    if (event.currentIndex >= 3 || (i == 2 && event.currentIndex != 1)) {
      return;
    }

    //Obtiene las respuestas anteriores que se pusieron en el boton correspondiente
    let respuestasAnterior;
    if (i == 2) {
      respuestasAnterior = event.container.data[event.currentIndex + 3]['resp'];
    } else {
      respuestasAnterior = event.container.data[event.currentIndex]['resp'];
    }

    if (i == 1) {
      if (event.previousContainer === event.container) {
        return;
      } else {
        transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);

        const iconoAnterior = event.container.data[event.currentIndex]['icon'];
        const textoAnterior = event.container.data[event.currentIndex]['texto'];
        const bgAnterior = event.container.data[event.currentIndex]['bg'];
        const colorAnterior = event.container.data[event.currentIndex]['color'];
        const imagenAnterior = event.container.data[event.currentIndex]['imagen'];
        const imagen2Anterior = event.container.data[event.currentIndex]['imagen2'];
        const imagen3Anterior = event.container.data[event.currentIndex]['imagen3'];
        this[`${botones}`].splice(event.previousIndex, 0, { icon: `${iconoAnterior}`, texto: `${textoAnterior}`, bg: `${bgAnterior}`, color: `${colorAnterior}`, imagen: `${imagenAnterior}`, imagen2: `${imagen2Anterior}`, imagen3: `${imagen3Anterior}` })

        this.botonesDrop2[event.currentIndex].resp = respuestasAnterior;
        this.botonesDrop2.splice(event.currentIndex + 1, 1)

      }
    } else {
      if (event.previousContainer === event.container) {
        return;
      } else {
        transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          4);

        const iconoAnterior = event.container.data[4]['icon'];
        const textoAnterior = event.container.data[4]['texto'];
        const bgAnterior = event.container.data[4]['bg'];
        const colorAnterior = event.container.data[4]['color'];
        const imagenAnterior = event.container.data[4]['imagen'];
        const imagen2Anterior = event.container.data[4]['imagen2'];
        const imagen3Anterior = event.container.data[4]['imagen3'];
        this[`${botones}`].splice(event.previousIndex, 0, { icon: `${iconoAnterior}`, texto: `${textoAnterior}`, bg: `${bgAnterior}`, color: `${colorAnterior}`, imagen: `${imagenAnterior}`, imagen2: `${imagen2Anterior}`, imagen3: `${imagen3Anterior}` })

        this.botonesDrop2[event.currentIndex + 3].resp = respuestasAnterior;
        this.botonesDrop2.splice(4 + 1, 1)
      }
    }

  }


  drop3(event: CdkDragDrop<string[]>, i: any) {
    let indiceActual = event.currentIndex;
    let valor = 0;
    let botones = '';

    if (event.previousContainer.id == "cdk-drop-list-0" || event.previousContainer.id == "cdk-drop-list-1" || event.previousContainer.id == "cdk-drop-list-2") {
    } else {
      return;
    }

    if ((i == 1 && indiceActual != 0) && (i == 1 && indiceActual != 2) || (i == 3 && indiceActual != 0) && (i == 3 && indiceActual != 1)) {
      return;
    }


    if (event.previousContainer.id.includes('0')) {
      botones = 'btnDrag1'
    }
    if (event.previousContainer.id.includes('1')) {
      botones = 'btnDrag2'
    }
    if (event.previousContainer.id.includes('2')) {
      botones = 'btnDrag3'
    }

    let respuestasAnterior;
    if (i == 3) {
      valor = 6;
      respuestasAnterior = event.container.data[event.currentIndex + valor]['resp'];
    } else {
      respuestasAnterior = event.container.data[event.currentIndex]['resp'];
    }

    if (event.previousContainer === event.container) {
      return;
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex + valor);

      const iconoAnterior = event.container.data[event.currentIndex + valor]['icon'];
      const textoAnterior = event.container.data[event.currentIndex + valor]['texto'];
      const bgAnterior = event.container.data[event.currentIndex + valor]['bg'];
      const colorAnterior = event.container.data[event.currentIndex + valor]['color'];
      const imagenAnterior = event.container.data[event.currentIndex + valor]['imagen'];
      const imagen2Anterior = event.container.data[event.currentIndex + valor]['imagen2'];
      const imagen3Anterior = event.container.data[event.currentIndex + valor]['imagen3'];
      this[`${botones}`].splice(event.previousIndex, 0, { icon: `${iconoAnterior}`, texto: `${textoAnterior}`, bg: `${bgAnterior}`, color: `${colorAnterior}`, imagen: `${imagenAnterior}`, imagen2: `${imagen2Anterior}`, imagen3: `${imagen3Anterior}` })


      if (i == 3) {
        this.botonesDrop3.splice(event.currentIndex + valor + 1, 1)
        this.botonesDrop3[event.currentIndex + valor].resp = respuestasAnterior;
      } else {
        this.botonesDrop3.splice(event.currentIndex + 1, 1)
        this.botonesDrop3[event.currentIndex].resp = respuestasAnterior;
      }

    }

  }

  drop4(event: CdkDragDrop<string[]>, i: any) {
    let botones = '';
    let valor = 0;

    if (event.previousContainer.id == "cdk-drop-list-0" || event.previousContainer.id == "cdk-drop-list-1" || event.previousContainer.id == "cdk-drop-list-2") {

    } else {
      return;
    }

    if (event.currentIndex == 3 || (i == 2 && event.currentIndex == 1)) {
      return;
    }

    if (event.previousContainer.id.includes('0')) {
      botones = 'btnDrag1'
    }
    if (event.previousContainer.id.includes('1')) {
      botones = 'btnDrag2'
    }
    if (event.previousContainer.id.includes('2')) {
      botones = 'btnDrag3'
    }

    let respuestasAnterior;
    if (i == 2) {
      valor = 4;
      respuestasAnterior = event.container.data[event.currentIndex + valor]['resp'];
    } else {
      respuestasAnterior = event.container.data[event.currentIndex]['resp'];
    }

    if (event.previousContainer === event.container) {
      return;
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex + valor);

      const iconoAnterior = event.container.data[event.currentIndex + valor]['icon'];
      const textoAnterior = event.container.data[event.currentIndex + valor]['texto'];
      const bgAnterior = event.container.data[event.currentIndex + valor]['bg'];
      const colorAnterior = event.container.data[event.currentIndex + valor]['color'];
      const imagenAnterior = event.container.data[event.currentIndex + valor]['imagen'];
      const imagen2Anterior = event.container.data[event.currentIndex + valor]['imagen2'];
      const imagen3Anterior = event.container.data[event.currentIndex + valor]['imagen3'];
      this[`${botones}`].splice(event.previousIndex, 0, { icon: `${iconoAnterior}`, texto: `${textoAnterior}`, bg: `${bgAnterior}`, color: `${colorAnterior}`, imagen: `${imagenAnterior}`, imagen2: `${imagen2Anterior}`, imagen3: `${imagen3Anterior}` })


      if (i == 2) {
        this.botonesDrop4.splice(event.currentIndex + valor + 1, 1)
        this.botonesDrop4[event.currentIndex + valor].resp = respuestasAnterior;
      } else {
        this.botonesDrop4.splice(event.currentIndex + 1, 1)
        this.botonesDrop4[event.currentIndex].resp = respuestasAnterior;
      }

    }

  }

  guardar() {

    let btnSeleccionado = ''
    let bloque = 0

    if (this.bloque1) {
      //Bloque 1 seleccionado
      bloque = 1
      btnSeleccionado = 'botonesDrop'
    }
    if (this.bloque2) {
      //Bloque 2 seleccionado
      bloque = 2
      btnSeleccionado = 'botonesDrop2'
    }
    if (this.bloque3) {
      //Bloque 3 seleccionado
      bloque = 3
      btnSeleccionado = 'botonesDrop3'
    }
    if (this.bloque4) {
      //Bloque 4 seleccionado
      bloque = 4
      btnSeleccionado = 'botonesDrop4'
    }
    if (this.sinBloque) {
      //Sin bloque seleccionado
      this.warningDropImagenes("Debe seleccionar un formato de Menú gráfico", "Advertencia")
      return;
    }



    if (this[`${btnSeleccionado}`]) {

    } else {
      this.warningDropImagenes("Debe asignar botones a su menú gráfico", "Advertencia")
      return;
    }


    let cImagenes = 0;
    let cBotones = 0;
    this[`${btnSeleccionado}`].map(respu => {

      if (respu.resp?.length) {
        cImagenes++;
      }

      if (respu.imagen) {
        cBotones++;
      }

    })


    let hayAnunciosDrop = false;
    if (cImagenes == 4) {
      //Iria un boolean para mostrar un mensaje en de que debe seleccion ar botones
    } else {
      this.warningDropImagenes("Debe asignar botones y su respectiva respuesta al menú gráfico", "Advertencia")
      return false;
    }
    if (cBotones == 4) {
      //Iria un boolean para mostrar un mensaje en de que debe seleccion imagenes para botones
    } else {
      this.warningDropImagenes("Debe asignar botones y su respectiva respuesta al menú gráfico", "Advertencia")
      return false;
    }
    if (this.anunciosDrop[0].id == 0 || this.anunciosDrop[1].id == 0 || this.anunciosDrop[2].id == 0 || this.anunciosDrop[3].id == 0) {
      this.warningDropImagenes("Debe seleccionar los anuncios que se mostrarán", "Advertencia")
      hayAnunciosDrop = false;
      return;
    } else {
      //Iria un boolean para mostrar un mensaje en de que debe seleccion imagenes para botones
      hayAnunciosDrop = true;
    }



    //Falta validar el carrusel de imagenes
    // (this.anunciosDrop[0].id && this.anunciosDrop[1].id && this.anunciosDrop[2].id && this.anunciosDrop[3].id)
    if (cImagenes == 4 && cImagenes == 4 && hayAnunciosDrop == true) {
      //Se completaria y madaria la generación del QR

      //id lo tenfo que recuperar del service o del localestroge
      this.menuModel._id = this._id;
      this.menuModel.anuncios = this.anunciosDrop;
      this.menuModel.bloque = bloque;
      this.menuModel.datos = this[`${btnSeleccionado}`];

      if (this.fileImagenSubir) {
        const file_data = this.fileImagenSubir
        const data = new FormData()
        data.append("file", file_data);
        data.append("upload_preset", "idr_angular");
        data.append("cloud_name", "idrenlinea")

        Swal.fire({
          allowOutsideClick: false,
          icon: 'info',
          text: 'Subiendo imagen y guardando información, espere un momento, por favor...'
        });
        Swal.showLoading();


        //Mandar bloque y hacer un modelo de datos para recibir los datos correspondientes
        this._auth.uploadImagen(data).pipe(
          concatMap(resp => {
            this.menuModel.anuncios[this.posicionAnuncio4].imagen = resp.secure_url
            return this._auth.guardarDatosIdr(this.menuModel)
          })
        ).subscribe(resp => {
          // Swal.fire({
          //   width: 300,
          //   heightAuto: false,
          //   title: 'Datos guardados',
          //   text: 'Escanee el QR generado y vea su Menú gráfico en su celular',
          //   icon: "success"
          // })
          Swal.fire('Datos guardados, escanee el QR generado')
          // this.urlQR = `https://idrenlinea.solucionesavanzadasyserviciosdigitales.com/#/idr/${this._id}?token=${this.token}`
          this.urlQR = `https://idrenlinea.sas-digital.com.mx/#/idr/${this._id}?token=${this.token}`
          // this.urlQR = `${this._id}?token=${this.token}`
          // this.urlQR = `${this.token}`
          this.booleanQR = true;
        }, error => {
          console.log(error);
        }, () => {
          $("#staticBackdrop").modal("show");
        }
        )

      } else {

        Swal.fire({
          allowOutsideClick: false,
          icon: 'info',
          text: 'Guardando información, espere un momento, por favor...'
        });
        Swal.showLoading();

        this._auth.guardarDatosIdr(this.menuModel).subscribe(resp => {
          // Swal.fire('Datos guardados, escanee el QR generado')
          // this.urlQR = `https://idrenlinea.solucionesavanzadasyserviciosdigitales.com/#/idr/${this._id}?token=${this.token}`
          this.urlQR = `https://idrenlinea.sas-digital.com.mx/#/idr/${this._id}?token=${this.token}`
          // this.urlQR = `${this._id}?token=${this.token}`
          // this.urlQR = `${this.token}`
          this.booleanQR = true;
          this.datosUsuario = {
            ...this.datosUsuario,
            url: this.urlQR
          }
          this._auth.enviarDatosMenu(this.datosUsuario).subscribe(resp => {
            Swal.fire('Datos guardados, escanee el QR generado')
          }, error => {
            console.log(error);
            this._auth.enviarDatosMenu2(this.datosUsuario).subscribe(res => {
              Swal.fire('Datos guardados, escanee el QR generado')
            })
          })

        }, error => {
          console.log(error);
          Swal.close()
        }, () => {
          $("#staticBackdrop").modal("show");
        })

      }

    } else {
      this.errorsToastr("Debe completar todos los puntos", "Error")
      return
    }

  }

  errorsToastr(mensaje: string, titulo: string) {
    this.toastr.error(`${mensaje}`, `${titulo}`, {
      timeOut: 5000,
    });
  }

  warningDropImagenes(mensaje: string, titulo: string) {
    this.toastr.warning(`${mensaje}`, `${titulo}`, {
      timeOut: 5000,
    });
  }

  dropImagenes(event: CdkDragDrop<string[]>) {

    if (event.previousContainer.id != "cdk-drop-list-3" || event.currentIndex == 4) {
      return;
    }

    if (!this.botonesDrop[event.currentIndex]['imagen']) {
      this.warningDropImagenes("Debe asignar primero un botón", "Advertencia")
      return
    }

    if (event.previousContainer === event.container) {
      return;
    } else {

      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);

      const imagenAnterior = event.container.data[event.currentIndex]['imagen'];
      const enlaceAnterior = event.container.data[event.currentIndex]['enlace'];
      const idAnterior = event.container.data[event.currentIndex]['id'];
      this.respuestasDrag.splice(event.previousIndex, 0, { imagen: `${imagenAnterior}`, enlace: `${enlaceAnterior}`, id: idAnterior })

      this.respuestasDrop1.splice(event.currentIndex + 1, 1)

      this.botonesDrop[event.currentIndex].resp = [this.respuestasDrop1[event.currentIndex]]

    }

  }


  dropImagenes2(event: CdkDragDrop<string[]>) {

    if (event.previousContainer.id != "cdk-drop-list-3" || event.currentIndex == 4) {
      return;
    }

    if (event.currentIndex == 3) {
      if (!this.botonesDrop2[4]['imagen2']) {
        this.warningDropImagenes("Debe asignar primero un botón", "Advertencia")
        return
      }
    } else if (!this.botonesDrop2[event.currentIndex]['imagen2']) {
      this.warningDropImagenes("Debe asignar primero un botón", "Advertencia")
      return
    }



    if (event.previousContainer === event.container) {
      return;
    } else {

      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);

      const imagenAnterior = event.container.data[event.currentIndex]['imagen'];
      const enlaceAnterior = event.container.data[event.currentIndex]['enlace'];
      const idAnterior = event.container.data[event.currentIndex]['id'];
      this.respuestasDrag.splice(event.previousIndex, 0, { imagen: `${imagenAnterior}`, enlace: `${enlaceAnterior}`, id: idAnterior })

      this.respuestasDrop2.splice(event.currentIndex + 1, 1)

      if (event.currentIndex == 3) {
        this.botonesDrop2[4].resp = [this.respuestasDrop2[event.currentIndex]]
      } else {
        this.botonesDrop2[event.currentIndex].resp = [this.respuestasDrop2[event.currentIndex]]
      }

    }

  }

  dropImagenes3(event: CdkDragDrop<string[]>) {

    if (event.previousContainer.id != "cdk-drop-list-3" || event.currentIndex == 4) {
      return;
    }

    if (event.currentIndex == 1) {
      if (!this.botonesDrop3[2]['imagen2']) {
        this.warningDropImagenes("Debe asignar primero un botón", "Advertencia")
        return
      }
    }

    if (event.currentIndex == 2) {
      if (!this.botonesDrop3[6]['imagen']) {
        this.warningDropImagenes("Debe asignar primero un botón", "Advertencia")
        return
      }
    }

    if (event.currentIndex == 3) {
      if (!this.botonesDrop3[7]['imagen']) {
        this.warningDropImagenes("Debe asignar primero un botón", "Advertencia")
        return
      }
    }

    if (event.currentIndex == 0) {
      if (!this.botonesDrop3[event.currentIndex]['imagen2']) {
        this.warningDropImagenes("Debe asignar primero un botón", "Advertencia")
        return
      }
    }


    if (event.previousContainer === event.container) {
      return;
    } else {

      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);

      const imagenAnterior = event.container.data[event.currentIndex]['imagen'];
      const enlaceAnterior = event.container.data[event.currentIndex]['enlace'];
      const idAnterior = event.container.data[event.currentIndex]['id'];
      this.respuestasDrag.splice(event.previousIndex, 0, { imagen: `${imagenAnterior}`, enlace: `${enlaceAnterior}`, id: idAnterior })

      this.respuestasDrop3.splice(event.currentIndex + 1, 1)

      switch (event.currentIndex) {
        case 0: this.botonesDrop3[event.currentIndex].resp = [this.respuestasDrop3[event.currentIndex]]
          break;
        case 1: this.botonesDrop3[2].resp = [this.respuestasDrop3[event.currentIndex]]
          break;
        case 2: this.botonesDrop3[6].resp = [this.respuestasDrop3[event.currentIndex]]
          break;
        case 3: this.botonesDrop3[7].resp = [this.respuestasDrop3[event.currentIndex]]
          break;
        default: break;
      }

    }

  }

  dropImagenes4(event: CdkDragDrop<string[]>) {

    if (event.previousContainer.id != "cdk-drop-list-3" || event.currentIndex == 4) {
      return;
    }

    if (event.currentIndex == 3) {
      if (!this.botonesDrop4[4]['imagen3']) {
        this.warningDropImagenes("Debe asignar primero un botón", "Advertencia")
        return
      }
    } else if (!this.botonesDrop4[event.currentIndex]['imagen3']) {
      this.warningDropImagenes("Debe asignar primero un botón", "Advertencia")
      return
    }

    if (event.previousContainer === event.container) {
      return;
    } else {

      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);

      const imagenAnterior = event.container.data[event.currentIndex]['imagen'];
      const enlaceAnterior = event.container.data[event.currentIndex]['enlace'];
      const idAnterior = event.container.data[event.currentIndex]['id'];
      this.respuestasDrag.splice(event.previousIndex, 0, { imagen: `${imagenAnterior}`, enlace: `${enlaceAnterior}`, id: idAnterior })

      this.respuestasDrop4.splice(event.currentIndex + 1, 1)

      if (event.currentIndex == 3) {
        this.botonesDrop4[4].resp = [this.respuestasDrop4[event.currentIndex]]
      } else {
        this.botonesDrop4[event.currentIndex].resp = [this.respuestasDrop4[event.currentIndex]]
      }

    }

  }

  dropAnuncios(event: CdkDragDrop<string[]>) {
    let valor = 0;

    if ((event.previousContainer.id != "cdk-drop-list-4" && event.previousContainer.id != "cdk-drop-list-5") || event.currentIndex == 4) {
      return;
    }

    if (event.previousContainer.id == "cdk-drop-list-5") {
      valor = 4;
    }

    if (event.currentIndex == this.posicionAnuncio4) {
      this.anuncio4 = 0;
    }

    if (event.previousContainer.id == "cdk-drop-list-4" && event.previousIndex == 3) {
      if (!this.fileImagen) {
        this.warningDropImagenes("Esta imagen no es asignable, suba una imagen", "Advertencia")
        return
      }
      if (this.anuncio4 == 0) {
        this.fileImagenSubir = this.fileImagen
        this.posicionAnuncio4 = event.currentIndex
        this.anuncio4++;
      } else {
        this.warningDropImagenes("Solo puede asignar une vez la imagen", "Advertencia")
        return
      }

    }

    if (event.previousContainer === event.container) {
      return;
    } else {

      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex + valor,
        event.currentIndex);

      const imagenAnterior = event.container.data[event.currentIndex]['imagen'];
      const idAnterior = event.container.data[event.currentIndex]['id'];
      this.anunciosDrag.splice(event.previousIndex + valor, 0, { imagen: `${imagenAnterior}`, id: idAnterior })

      this.anunciosAuxiliarDrop.splice(event.currentIndex + 1, 1)
      this.anunciosDrop.splice(event.currentIndex, 1, { imagen: `${imagenAnterior}`, id: idAnterior })

    }


  }


  onfileChange(event) {

    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file.type.includes("image/jpeg") || file.type.includes("image/jpg")) {
        this.fileImagen = file;
        const reader = new FileReader();
        let formData = new FormData();

        formData.append("file", file);

        reader.readAsDataURL(file);

        reader.onload = function load() {
          this.anunciosDrag[3].imagen = reader.result;
        }.bind(this);

      } else {
        this.warningDropImagenes("Solo acepta imagenes formato jpg/jpeg", "Formato de imagenes")
        event.srcElement.value = ""
      }
    }

  }


  async cerrarSesion() {
    let cerrar = await this._auth.cerrarSesion()
    window.location.href = "https://solucionesavanzadasyserviciosdigitales.com/"
  }


  navegarUrl(url: any){
    $("#staticBackdrop").modal('hide');
    // this.router.navigate(['/idr', this._id], { queryParams: { token: url } });

  }

}