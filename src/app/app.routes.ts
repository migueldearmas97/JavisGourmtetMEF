import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';

import {SearchComponent} from './components/search/search.component';
import {ContactComponent} from './components/contact/contact.component';
import {GaleriaComponent} from './components/galeria/galeria.component';
import {MenuComponent} from './components/menu/menu.component';

import {AdministrarComponent} from './components/administrar/administrar.component';
import {GestionPlatosComponent} from './components/gestion-platos/gestion-platos.component';
import {GestionMenusComponent} from './components/gestion-menus/gestion-menus.component';
import {GestionUsuariosComponent} from './components/gestion-usuarios/gestion-usuarios.component';
import {PlatoComponent} from './components/plato/plato.component';
import {UsuarioComponent} from './components/usuario/usuario.component';
import {MenuAComponent} from './components/menu-a/menu-a.component';
import {PagoComponent} from './components/pago/pago.component';
import {LoginComponent} from './components/login/login.component';
import {OfertaComponent} from './components/oferta/oferta.component';
import {PagesComponent} from './components/pages/pages.component';
import {AuthRoutesComponent} from './components/auth-routes/auth-routes.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';







const APP_ROUTES: Routes = [
    { 
        path: '', 
        component: PagesComponent,
        canActivate:[AuthGuard],
        children: [
    {path: 'administrar', component: AdministrarComponent},
    {path: 'gestion-platos', component: GestionPlatosComponent},
    {path: 'gestion-menus', component: GestionMenusComponent},

    

    {path: 'menu-a/:id', component: MenuAComponent},
    {path: 'plato/:id', component: PlatoComponent},
    {path: 'oferta/:id', component: OfertaComponent},
    {path: 'search/:termino', component: SearchComponent},
    
    //rutas solo del admin

    {path: 'gestion-usuario',canActivate:[AdminGuard] ,component: GestionUsuariosComponent},
    {path: 'usuario/:id',canActivate:[AdminGuard] , component: UsuarioComponent},
    { path: '', redirectTo: '/home', pathMatch: 'full' },
        ]
      },
    { 
        path: '', 
        component: AuthRoutesComponent,
        children: [
            {path: 'login', component: LoginComponent},
          { path: '', redirectTo: 'home', pathMatch: 'full' },
        ]
      },
   
    
      {path: 'home', component: HomeComponent},
    
    
      {path: 'pago/:name', component: PagoComponent},
      {path: 'contact', component: ContactComponent},
      {path: 'menu/:name', component: MenuComponent},
      {path: 'galeria', component: GaleriaComponent},

    {path: '**', pathMatch: 'full', redirectTo: 'home'}
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
