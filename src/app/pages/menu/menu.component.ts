import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  arr = [ {
    bares: [
      {
        titulo: 'Bar 1',
        ref: 'bar1'
      },
      {
        titulo: 'Bar 2',
        ref: 'bar2'
      }
    ],
    hoteles: [
      {
        titulo: 'Hotel 1',
        ref: 'hotel1'
      },
      {
        titulo: 'Hotel 2',
        ref: 'hotel2'
      }
    ]
  }]

  //No sirven estas dos
  submenu: any;
  id: string;
  _id: string;
  token: string;

  datos = []
  anuncios = []
  bloque = 0
  cargando: boolean = true;
  
  constructor(private route: ActivatedRoute, private _auth: AuthService) { 
    // [routerLink]="['/productividad']" [queryParams] = " { id: element.id, productividad: element.productividad, mes: this.mesProductividad, anio: this.anioProductividad } "
    const queryParams = this.route.queryParams['_value'];
    const id = this.route.snapshot.paramMap.get('id');
    if(queryParams.token){
      this.token = queryParams.token;
      this._id = id;
      localStorage.setItem('token', this.token )
      console.log("Entro a tener queryparamas");
    }else{
      this.token = localStorage.getItem('token');
      this._id = id;
      console.log("No tiene queryparamas");
      console.log(this.token);
    }
    
  }

  ngOnInit(): void {
    // this.id = this.route.snapshot.paramMap.get('id');
    // this.submenu = this.arr[0][this.id]
    this._auth.obtenerDatosIdr(this._id, this.token).subscribe(resp => {
      this.anuncios = [...resp.anuncios]
      console.log(resp);
      console.log(resp.datos);
      console.log(resp.anuncios);
      
      this.datos = [...resp.datos]
      
      this.bloque = resp.bloque
       
      console.log(this.datos);
      console.log(this.datos[0].resp[0].id);
      
      console.log(this.anuncios);
      

      localStorage.setItem('anuncios', JSON.stringify(this.anuncios))
      
      // console.log(this.datos[5].resp[0].id)
      this.cargando = false;
    }, error => {
      console.log("Mandar un mensaje de que no exite o el token ha venciod y redirirlo a la una página para que cree u menu");
      
      console.log(error);
      
    })
  }

}
