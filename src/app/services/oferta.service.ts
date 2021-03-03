import { Injectable } from '@angular/core';
import {  HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { map } from 'rxjs/operators';
import { OfertaModel } from '../models/oferta.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class OfertaService {

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
  cargarOfertas() {

    const url = `${ base_url }/offers`;
    return this.http.get( url, this.headers )
    .pipe(
      map((resp:{ok:boolean,offers:OfertaModel[]})=>resp.offers)
      );
         
  }
  cargarOfertaPorId(id:string) {

    const url = `${ base_url }/offers/${id}`;
    return this.http.get( url, this.headers )
    .pipe(
      map((resp:{ok:boolean,offer:OfertaModel})=>resp.offer)
      );
         
  }
  crearOfertas( offer:{name:string,price:string} ) {

    const url = `${ base_url }/offers`;
    return this.http.post( url,offer,this.headers );
         
  }
  actualizarOfertas( offer:OfertaModel ) {

    const url = `${ base_url }/offers/${offer._id}`;
    return this.http.put( url,offer,this.headers );
         
  }
  eliminarOfertas( offer:OfertaModel) {

    const url = `${ base_url }/offers/${offer._id}`;
    return this.http.delete( url,this.headers );
         
  }

}
