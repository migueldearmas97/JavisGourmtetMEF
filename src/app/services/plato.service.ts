import { Injectable } from '@angular/core';
import {  HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { map } from 'rxjs/operators';
import { PlatoModel } from '../models/plato.model';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class PlatoService {

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
  cargarPlatos() {

    const url = `${ base_url }/meals`;
    return this.http.get( url, this.headers )
    .pipe(
      map((resp:{ok:boolean,meals:PlatoModel[]})=>resp.meals)
      );
         
  }
  cargarPlatoPorId(id:string) {

    const url = `${ base_url }/meals/${id}`;
    return this.http.get( url, this.headers )
    .pipe(
      map((resp:{ok:boolean,meal:PlatoModel})=>resp.meal)
      );
         
  }
  buscarPLatoPorNombre( meal:PlatoModel) {

    const url = `${ base_url }/meals/filter/${meal.name}`;
    return this.http.get( url,this.headers )
    .pipe(
      map((resp:{ok:boolean,meal:PlatoModel})=>resp.meal)
      );
         
  }
  crearPlato( meal:PlatoModel ) {

    const url = `${ base_url }/meals`;
    return this.http.post( url,meal,this.headers );
         
  }
  actualizarPlato( meal:PlatoModel ) {

    const url = `${ base_url }/meals/${meal._id}`;
    return this.http.put( url,meal,this.headers );
         
  }
  eliminarPlato( meal:PlatoModel) {

    const url = `${ base_url }/meals/${meal._id}`;
    return this.http.delete( url,this.headers );
         
  }
 

}
