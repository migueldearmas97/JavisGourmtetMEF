import { Component, OnInit } from '@angular/core';
import { PlatoService } from '../../services/plato.service';
import { PlatoModel } from '../../models/plato.model';


declare function customjquerymagnificpopupminjs();
declare function customjquerymagnificpopupinitjs();
@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.css']
})
export class GaleriaComponent implements OnInit {
  public meals: PlatoModel[] = [];
  public defaultMeal: PlatoModel;
  public dayOfWeek: string[] = [];
  public loading: boolean = false;
  public loadingScript: boolean = false;

  constructor(private platoService: PlatoService) {
    
    
   }

  ngOnInit(): void {

  customjquerymagnificpopupinitjs();
  customjquerymagnificpopupminjs();
  this.gettingMeals();
  }

  gettingMeals(){
    
    this.platoService.cargarPlatos()
    .subscribe(resp => {
    
    this.meals = resp;
    console.log(this.meals);
    this.loading=true;
 
    if(this.loading){
    
    
      
     }
 
  
  });

  }

comparar(index:number){
  console.log(index);
  let first:boolean=false;
  if(index==0){
    first=true;
  }
  if(index>0){
    first=false;
  }
 
  return first;
}
activarScript(){
  console.log('se activo el render');

  this.loadingScript=true;
}




}
