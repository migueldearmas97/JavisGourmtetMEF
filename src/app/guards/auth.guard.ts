import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private usuarioService:UsuarioService, private router:Router){};

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      
     
     
      return  this.usuarioService.checkToken().
      pipe(
        tap(isAutenticated=>{
          if(!isAutenticated){
            this.router.navigateByUrl('/home');
          }
      }));
  }
  
}
