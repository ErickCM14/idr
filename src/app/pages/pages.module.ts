import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router'

// import { QRCodeModule } from 'angularx-qrcode';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ToastrModule } from 'ngx-toastr';

import { SharedModule } from '../shared/shared.module';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { IlustracionesComponent } from './ilustraciones/ilustraciones.component';
import { CreateAppComponent } from './create-app/create-app.component';

@NgModule({
  declarations: [
    PagesComponent,
    HomeComponent,
    MenuComponent,
    IlustracionesComponent,
    CreateAppComponent
  ],
  exports: [
    PagesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    ToastrModule.forRoot(),
    // QRCodeModule
  ]
})
export class PagesModule { }
