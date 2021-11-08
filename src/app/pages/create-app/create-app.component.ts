import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { AuthService } from 'src/app/services/auth.service';
import { concatMap, mergeMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { MenuModel } from 'src/app/models/menu.model';
import { ActivatedRoute } from '@angular/router';
declare const Swal;

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
      texto: 'Eventos y Expos',
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
      texto: 'Eventos y Expos',
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
      bg: 'gray'
    },
    {
      bg: 'gray'
    },
    {
      bg: 'gray'
    },
    {
      bg: 'gray'
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
      bg: 'gray'
    },
    {
      bg: 'blue',
      resp: []
    },
    {
      bg: 'gray'
    },
    {
      bg: 'gray'
    },
    {
      bg: 'gray'
    },
    {
      bg: 'gray'
    },
    {
      bg: 'gray'
    },
    {
      bg: 'gray'
    },
    {
      bg: 'gray'
    }
  ]

  botonesDrop3 = [
    {
      bg: 'blue',
      resp: []
    },
    {
      bg: 'gray'
    },
    {
      bg: 'blue',
      resp: []
    },
    {
      bg: 'gray'
    },
    {
      bg: 'gray'
    },
    {
      bg: 'gray'
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
      bg: 'gray'
    },
    {
      bg: 'gray'
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
      bg: 'gray'
    },
    {
      bg: 'blue',
      resp: []
    },
    {
      bg: 'gray'
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

  constructor(private _auth: AuthService, private toastr: ToastrService, private route: ActivatedRoute) { 
    this._id = localStorage.getItem('id')
    this.token = localStorage.getItem('token')

    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      console.log('Esto es un dispositivo móvil');
      Swal.fire({
        title: "Advertencia",
        text: "Esta aplicación web no esta desarrollada para utilizarse con un dispositivo móvil, use una computadora",
        icon: "info"
      })
      
   }else{
     console.log("nooo");
     console.log(navigator.userAgent);
   }

  }

  ngOnInit(): void { }

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
    console.log(this.a);
    console.log(this.b);

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


      console.log(this[`${botones}`]);

    }

    console.log(this.botonesDrop);

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
    const respuestasAnterior = event.container.data[event.currentIndex]['resp'];
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

        this.botonesDrop2[event.currentIndex].resp = respuestasAnterior;
        this.botonesDrop2.splice(4 + 1, 1)
      }
    }

    console.log(this.botonesDrop2);

  }


  drop3(event: CdkDragDrop<string[]>, i: any) {
    let indiceActual = event.currentIndex;
    let valor = 0;
    let botones = '';
    console.log(event.previousContainer);
    

    if (event.previousContainer.id == "cdk-drop-list-0" || event.previousContainer.id == "cdk-drop-list-1" || event.previousContainer.id == "cdk-drop-list-2") {

    } else {
      console.log("Nooo es uno de los primeros 3 drop list");
      return;
    }

    if ((i == 1 && indiceActual != 0) && (i == 1 && indiceActual != 2) || (i == 3 && indiceActual != 0) && (i == 3 && indiceActual != 1)) {
      console.log("no es el primero, ni el segundo");
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

    if (i == 3) {
      valor = 6;
    }

    const respuestasAnterior = event.container.data[event.currentIndex]['resp'];

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

      this.botonesDrop2[event.currentIndex].resp = respuestasAnterior;
      if (i == 3) {
        this.botonesDrop3.splice(event.currentIndex + valor + 1, 1)
      } else {
        this.botonesDrop3.splice(event.currentIndex + 1, 1)
      }

    }

    console.log(this.botonesDrop3);

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

    if (i == 2) {
      valor = 4;
    }

    const respuestasAnterior = event.container.data[event.currentIndex]['resp'];
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

      this.botonesDrop2[event.currentIndex].resp = respuestasAnterior;
      if (i == 2) {
        this.botonesDrop4.splice(event.currentIndex + valor + 1, 1)
      } else {
        this.botonesDrop4.splice(event.currentIndex + 1, 1)
      }

    }

    console.log(this.botonesDrop4);

  }

  guardar() {
    // console.log(v);

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
      console.log("hay datos");
      console.log(this[`${btnSeleccionado}`]);
    } else {
      console.log("No hay datos");
      this.warningDropImagenes("Debe asignar botones a su menú gráfico", "Advertencia")
      return;
    }


    let cImagenes = 0;
    let cBotones = 0;
    console.log( this[`${btnSeleccionado}`]);
    this[`${btnSeleccionado}`].map(respu => {
      // console.log(respu);

      if (respu.resp?.length) {
        console.log("Hay iagenes asignadas a botones");
        cImagenes++;
        // console.log("contador Imagenes::", cImagenes);
      } else {
        console.log("No hay imagenes asignados a botones");
        // return
      }

      if (respu.imagen) {
        console.log("Hay botones asignados");
        cBotones++;
        console.log("contador Botones::", cBotones);
      } else {
        console.log("No hay botones asignados");
      }

    })
    


    if (cImagenes == 4) {
      //Iria un boolean para mostrar un mensaje en de que debe seleccion ar botones
      console.log("Hay imagenes asignadas a botones, contador");
    } else {
      this.warningDropImagenes("Debe asignar botones y su respectiva respuesta al menú gráfico", "Advertencia")
      return
    }
    if (cBotones == 4) {
      //Iria un boolean para mostrar un mensaje en de que debe seleccion imagenes para botones
      console.log("Hay botones asignados, contador");
    } else {
      this.warningDropImagenes("Debe asignar botones y su respectiva respuesta al menú gráfico", "Advertencia")
      return
    }
    if (this.anunciosDrop[0].id && this.anunciosDrop[1].id && this.anunciosDrop[2].id && this.anunciosDrop[3].id  ) {
      //Iria un boolean para mostrar un mensaje en de que debe seleccion imagenes para botones
      console.log("Hay anuncios asignados, contador");
    } else {
      this.warningDropImagenes("Debe asignar seleccionar los anuncios que se mostrarán", "Advertencia")
      return
    }

    

    //Falta validar el carrusel de imagenes

    if (cImagenes == 4 && cImagenes == 4 && (this.anunciosDrop[0].id && this.anunciosDrop[1].id && this.anunciosDrop[2].id && this.anunciosDrop[3].id) ) {
      //Se completaria y madaria la generación del QR
      console.log("hay imahenes y bltones completos yyyy anuncios");

      //id lo tenfo que recuperar del service o del localestroge
      this.menuModel._id = this._id;
      this.menuModel.anuncios = this.anunciosDrop;
      this.menuModel.bloque = bloque;
      this.menuModel.datos = this[`${btnSeleccionado}`];

      if (this.fileImagenSubir) {
        console.log(this.fileImagenSubir);
        const file_data = this.fileImagenSubir
        const data = new FormData()
        data.append("file", file_data);
        data.append("upload_preset", "idr_angular");
        data.append("cloud_name", "idrenlinea")

        Swal.fire({
          allowOutsideClick: false,
          icon: 'info',
          text: 'Subiendo imagen y guardanto información, espere un momento, por favor...'
        });
        Swal.showLoading();

        
        //Mandar bloque y hacer un modelo de datos para recibir los datos correspondientes
        this._auth.uploadImagen(data).pipe(
          concatMap(resp => {
            console.log(resp);
            this.menuModel.anuncios[this.posicionAnuncio4].imagen = resp.secure_url
            // this.anunciosDrop[this.posicionAnuncio4].imagen = resp.secure_url
            console.log( this.anunciosDrop[this.posicionAnuncio4].imagen );
            console.log(this.menuModel);
            
            
            return this._auth.guardarDatosIdr(this.menuModel)
            
          })
        ).subscribe(resp => {
          console.log(resp)
          console.log(this[`${btnSeleccionado}`]);
          console.log(this.anunciosDrop);
          Swal.fire({
            title: 'Datos guardados',
            text: 'Escanee el QR generado y vea su Menú gráfico en su celular',
            icon: "success"
          })
          this.urlQR = `https://idrenlinea.solucionesavanzadasyserviciosdigitales.com/#/idr/${this._id}?token=${this.token}`
          // this.urlQR = `http://localhost:4200/#/idr/${this._id}?token=${this.token}`
          this.booleanQR = true;
        }, error => {
          console.log(error);
        }, () => {
          console.log("Se completo todo");
        }
        )

      }else{

        Swal.fire({
          allowOutsideClick: false,
          icon: 'info',
          text: 'Guardanto información, espere un momento, por favor...'
        });
        Swal.showLoading();

        this._auth.guardarDatosIdr(this.menuModel).subscribe(resp => {
          console.log(resp);
          Swal.fire({
            title: 'Datos guardados',
            text: 'Escanee el QR generado y vea su Menú gráfico en su celular',
            icon: "success"
          })
          this.urlQR = `https://idrenlinea.solucionesavanzadasyserviciosdigitales.com/#/idr/${this._id}?token=${this.token}`
          // this.urlQR = `http://localhost:4200/#/idr/${this._id}?token=${this.token}`
          this.booleanQR = true;
          console.log(this.menuModel);
          console.log(this[`${btnSeleccionado}`]);
          
          //contra z(Fn2JETUa
          //617a3a6c3931ce2c381113e1
          //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxN2EzYTZjMzkzMWNlMmMzODExMTNlMSIsImVtYWlsIjoiaWRyLmVubGluZWFAZ21haWwuY29tIiwiZXhwIjoxNjQzODUzNTQ2LCJpYXQiOjE2MzYwNzc1NDZ9.Y6aX3ZADl7VkMh8QfgOjoDPwcW_6pEOvVrjho0uzBD0
        }, error => {
          console.log(error);
          Swal.close()
        })

      }

    } else {
      this.errorsToastr("Debe completar todos los puntos", "Error")
    }

  }

  errorsToastr(mensaje: string, titulo:string){
    this.toastr.error(`${mensaje}`, `${titulo}`, {
      timeOut: 5000,
    });
  }

  warningDropImagenes(mensaje: string, titulo: string){
    this.toastr.warning(`${mensaje}`, `${titulo}`, {
      timeOut: 5000,
    });
  }

  dropImagenes(event: CdkDragDrop<string[]>) {

    console.log(event.container);
    console.log(event.previousContainer);

    console.log(event.currentIndex);
    console.log(event.previousIndex);



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

    console.log(this.botonesDrop);

  }


  dropImagenes2(event: CdkDragDrop<string[]>) {

    console.log(this.botonesDrop2);

    if (event.previousContainer.id != "cdk-drop-list-3" || event.currentIndex == 4) {
      console.log("entro al if primero");
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

      console.log(this.respuestasDrop2[event.currentIndex]);

      if (event.currentIndex == 3) {
        this.botonesDrop2[4].resp = [this.respuestasDrop2[event.currentIndex]]
      } else {
        this.botonesDrop2[event.currentIndex].resp = [this.respuestasDrop2[event.currentIndex]]
      }


      console.log(this.botonesDrop2);

    }

    console.log(event.container.data);
    console.log(this.respuestasDrop2);
    console.log(this.respuestasDrag);

  }

  dropImagenes3(event: CdkDragDrop<string[]>) {

    console.log(this.botonesDrop3);

    if (event.previousContainer.id != "cdk-drop-list-3" || event.currentIndex == 4) {
      console.log("entro al if primero");

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

      console.log(this.respuestasDrop3[event.currentIndex]);

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

      console.log(this.botonesDrop3);

    }

    console.log(event.container.data);
    console.log(this.respuestasDrop3);
    console.log(this.respuestasDrag);

  }

  dropImagenes4(event: CdkDragDrop<string[]>) {

    console.log(this.botonesDrop4);

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

      console.log(this.respuestasDrop4[event.currentIndex]);

      if (event.currentIndex == 3) {
        this.botonesDrop4[4].resp = [this.respuestasDrop4[event.currentIndex]]
      } else {
        this.botonesDrop4[event.currentIndex].resp = [this.respuestasDrop4[event.currentIndex]]
      }

      console.log(this.botonesDrop4);

    }

    console.log(event.container.data);
    console.log(this.respuestasDrop4);
    console.log(this.respuestasDrag);

  }

  dropAnuncios(event: CdkDragDrop<string[]>) {
    let valor = 0;

    if ((event.previousContainer.id != "cdk-drop-list-4" && event.previousContainer.id != "cdk-drop-list-5") || event.currentIndex == 4) {
      console.log("entro al if primero");
      return;
    }

    if (event.previousContainer.id == "cdk-drop-list-5") {
      valor = 4;
    }

    if (event.currentIndex == this.posicionAnuncio4) {
      console.log("enrroo");
      // this.anunciosAuxiliarDrop[this.posicionAnuncio4].imagen = ''
      // this.anunciosDrop[this.posicionAnuncio4].imagen = '../../../assets/anuncios/anunciese.png'
      this.anuncio4 = 0;
    }

    if (event.previousContainer.id == "cdk-drop-list-4" && event.previousIndex == 3) {
      if (!this.fileImagen) {
        this.warningDropImagenes("Esta imagen no es asignable, suba una imagen", "Advertencia")
        return
      }
      if (this.anuncio4 == 0) {
        this.fileImagenSubir = this.fileImagen
        console.log("Imagen a  subir:", this.fileImagenSubir);
        this.posicionAnuncio4 = event.currentIndex
        this.anuncio4++;
      } else {
        console.log("Solo puede colocarlo una vez");
        this.warningDropImagenes("Solo puede asignar une vez la imagen", "Advertencia")
        return
      }



      console.log(this.posicionAnuncio4);


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
    // console.log('img: ', event);

    
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file.type.includes("image/jpeg")) {
        this.fileImagen = file;
        console.log("Imagen cargada::", this.fileImagen);

        const reader = new FileReader();
        let formData = new FormData();

        formData.append("file", file);
        console.log(formData.get('file'));

        reader.readAsDataURL(file);

        reader.onload = function load() {
          this.anunciosDrag[3].imagen = reader.result;
        }.bind(this);

      }else{
        event.srcElement.value = "" 
      }
    }

  }


  async cerrarSesion(){
     let cerrar = await this._auth.cerrarSesion()
     console.log(cerrar);
    window.location.href="https://solucionesavanzadasyserviciosdigitales.com/"
  }



}