import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

import { PagesComponent } from './pages.component';
import { HomeComponent } from "./home/home.component";
import { MenuComponent } from './menu/menu.component';
import { IlustracionesComponent } from "./ilustraciones/ilustraciones.component";
import { CreateAppComponent } from './create-app/create-app.component';
import { AuthGuard } from "../guards/auth.guard";

const routes: Routes = [
    {
        path: 'idr',
        component: PagesComponent,
        children: [
            { path: '', component: CreateAppComponent, canActivate: [ AuthGuard ] },
            { path: 'app', component: HomeComponent },
            // { path: ':id', component: SubmenusComponent },
            { path: ':id', component: MenuComponent},
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