import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagesRoutingModule } from './pages/pages.routing';
import { AuthRoutingModule } from './auth/auth.routing';

import { NopagefoundComponent } from './nopagefound/nopagefound.component';

const routes: Routes = [
  
  // idr.enlinea@gmail.com | uCBz^0WkQx
  // erickcarranzameza@gmail.com | DY7+k_Tv!l    inicio sesion
  // erick@erick.com | J¡Gcg,HM3v
  // idr.enlinea@gmail.com | z(Fn2JETUa

  // path: '/idr PagesRouting'
  // path: '/login' AuthRouting
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  // { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: NopagefoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {useHash: true}),
    // [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
    PagesRoutingModule,
    AuthRoutingModule,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }