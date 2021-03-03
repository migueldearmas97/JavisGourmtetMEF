import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserForm } from '../interfaces/user-form.interface';
import { tap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { error } from '@angular/compiler/src/util';
import { Router } from '@angular/router';
import { UserModel } from '../models/user';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

   public roleTemp:string;

  constructor(private http: HttpClient, private router: Router) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }



  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    };
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

get role(): string{

return this.roleTemp;
  
}


  checkToken(): Observable<boolean>{
    const token = localStorage.getItem('token') || '';
    return this.http.get(`${base_url}/login/renew`, {
      headers: {
      'x-token': token
    }
  }).pipe(
    tap((resp: any) => {
      console.log(resp.user.role);
      localStorage.setItem('token', resp.token);
      this.roleTemp=resp.user.role;
  
    }), map(resp => true),
        catchError(error => of(false))
    );

  }
 

  createUser(formData: UserForm){
    console.log('creando usuario');
    
    return this.http.post(`${base_url}/users`, formData);
  }
  loginUser(formData: LoginForm){
    console.log('logeando usaurio');
    
    return this.http.post(`${base_url}/login`, formData).pipe(map((resp: any) => {
      
      localStorage.setItem('token', resp.token);
 
     
      return true;
}))
        ;
  }
  actualizarUsuario( user: UserModel ) {

    const url = `${ base_url }/users/${user._id}`;
    return this.http.put( url, user, this.headers );
         
  }
  eliminarUsuario( user: UserModel) {

    const url = `${ base_url }/users/${user._id}`;
    return this.http.delete( url, this.headers );
         
  }
  cargarUsuarios() {

    const url = `${ base_url }/users`;
    return this.http.get( url, this.headers )
    .pipe(
      map((resp: {ok: boolean, users: UserModel[]}) => resp.users)
      );
         
  }
  cargarUsuarioPorId(id: string) {

    const url = `${ base_url }/users/${id}`;
    return this.http.get( url, this.headers )
    .pipe(
      map((resp: {ok: boolean, user: UserModel}) => resp.user)
      );
         
  }
}
