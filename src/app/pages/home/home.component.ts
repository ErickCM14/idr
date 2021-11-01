import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  botones = [
    {
      titulo: 'Bares',
      ref: 'bares'
    },
    {
      titulo: 'Hoteles',
      ref: 'hoteles'
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
