import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
// Rutas
import {APP_ROUTING} from './app.routes';
// Servicios
import {HeroesService} from './services/heroes.service';
//Pipes
import { ImagenPipe } from './pipes/imagen.pipe';
// Componentes
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';

import { SearchComponent } from './components/search/search.component';
import { ContactComponent } from './components/contact/contact.component';
import { MenuComponent } from './components/menu/menu.component';
import { AdministrarComponent } from './components/administrar/administrar.component';
import { GaleriaComponent } from './components/galeria/galeria.component';
import { PagoComponent } from './components/pago/pago.component';
import { LoginComponent } from './components/login/login.component';
import { GestionPlatosComponent } from './components/gestion-platos/gestion-platos.component';
import { GestionMenusComponent } from './components/gestion-menus/gestion-menus.component';
import { OfertaComponent } from './components/oferta/oferta.component';
import { PlatoComponent } from './components/plato/plato.component';
import { MenuAComponent } from './components/menu-a/menu-a.component';
import { PagesComponent } from './components/pages/pages.component';
import { NavbarAComponent } from './components/shared/navbar-a/navbar-a.component';
import { AuthRoutesComponent } from './components/auth-routes/auth-routes.component';
import { NavbarLComponent } from './components/shared/navbar-l/navbar-l.component';
import { GestionUsuariosComponent } from './components/gestion-usuarios/gestion-usuarios.component';
import { UsuarioComponent } from './components/usuario/usuario.component';






@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
   
    SearchComponent,
    ContactComponent,
    MenuComponent,
    AdministrarComponent,
    PagoComponent,
    GaleriaComponent,
    LoginComponent,
    GestionPlatosComponent,
    GestionMenusComponent,
    OfertaComponent,
    PlatoComponent,
    MenuAComponent,
    PagesComponent,
    NavbarAComponent,
    AuthRoutesComponent,
    NavbarLComponent,
    GestionUsuariosComponent,
    UsuarioComponent,
    ImagenPipe,
   

  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    HeroesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
