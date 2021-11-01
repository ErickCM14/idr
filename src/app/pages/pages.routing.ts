import { AuthGuard } from './../../../../Mercadology-Analytics/src/app/guards/auth.guard';
import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

import { PagesComponent } from './pages.component';
import { HomeComponent } from "./home/home.component";
import { MenuComponent } from './menu/menu.component';
import { IlustracionesComponent } from "./ilustraciones/ilustraciones.component";
import { CreateAppComponent } from './create-app/create-app.component';

const routes: Routes = [
    {
        path: 'idr',
        component: PagesComponent,
        canActivate: [ AuthGuard ],
        children: [
            { path: '', component: CreateAppComponent },
            { path: 'app', component: HomeComponent },
            // { path: ':id', component: SubmenusComponent },
            { path: ':id', component: MenuComponent },
            { path: ':idUsuario/:id', component: IlustracionesComponent }
            // { path: '', redirectTo: '/inicio', pathMatch: 'full' }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }