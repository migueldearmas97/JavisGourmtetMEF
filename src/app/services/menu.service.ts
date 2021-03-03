import { Injectable } from '@angular/core';
import {  HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { map } from 'rxjs/operators';
import { MenuAModel } from '../models/menu-a.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http:HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }
  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }
  cargarMenus() {

    const url = `${ base_url }/menus`;
    return this.http.get( url, this.headers )
    .pipe(
      map((resp:{ok:boolean,menus:MenuAModel[]})=>resp.menus)
      );
         
  }
  cargarMenuPorId(id:string) {

    const url = `${ base_url }/menus/${id}`;
    return this.http.get( url, this.headers )
    .pipe(
      map((resp:{ok:boolean,menu:MenuAModel})=>resp.menu)
      );
         
  }
  crearMenus( menu:{name:string,description:string} ) {

    const url = `${ base_url }/menus`;
    return this.http.post( url,menu,this.headers );
         
  }
  actualizarMenu( menu:MenuAModel ) {

    const url = `${ base_url }/menus/${menu._id}`;
    return this.http.put( url,menu,this.headers );
         
  }
  eliminarMenu( menu:MenuAModel) {

    const url = `${ base_url }/menus/${menu._id}`;
    return this.http.delete( url,this.headers );
         
  }
}
