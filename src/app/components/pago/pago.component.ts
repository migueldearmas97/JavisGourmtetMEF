import { Component, OnInit } from '@angular/core';
import { OfertaModel } from '../../models/oferta.model';
import { OfertaService } from '../../services/oferta.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PlatoModel } from '../../models/plato.model';
import { PlatoService } from '../../services/plato.service';
import { MenuAModel } from '../../models/menu-a.model';
import { MenuService } from '../../services/menu.service';
import { FormBuilder,NgForm, Validators } from '@angular/forms';

declare function customMigue();

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit {
  public offers: OfertaModel[] = [];
  public offerSelected: OfertaModel;
  public opcionSeleccionado: string;
  public verSeleccion: string;
  public meals: PlatoModel[] = [];
  
  
  
  public mealsOfMonday: PlatoModel[] = [];
  public mealsOfTuesday: PlatoModel[] = [];
  public mealsOfWednesday: PlatoModel[] = [];
  public mealsOfThursday: PlatoModel[] = [];
  public mealsOfFriday: PlatoModel[] = [];
  public menu: MenuAModel;

  public PayForm = this.fb.group({
    offer: ['', Validators.required],
    dayOfWeek: ['', Validators.required],
   
  });
  
  constructor(private ofertaService: OfertaService,  private fb: FormBuilder,private router:Router, private platoService: PlatoService, private activatedRoute: ActivatedRoute, private menuService: MenuService) {}
  
  ngOnInit(): void {
    
    customMigue();
    this.activatedRoute.params.subscribe(({name}) => this.getMenuByName(name));
    this.gettingOffers();
    
  }
  gettingOffers(){
    
    this.ofertaService.cargarOfertas()
    .subscribe(resp => {
      
      this.offers = resp;
    });
    
  }
  getMenuByName(name: string){
    
    this.menuService.cargarMenus()
    .subscribe(resp => {
      
      this.extraerMenu(resp, name);
    });
    
  }
  getMealsByMenuId(id: string){
    this.meals.length = 0;
    this.platoService.cargarPlatos()
    .subscribe(resp => {
      
      resp.forEach(element => {
        if (element.menu == id){
          this.meals.push(element);
        }
      });
      this.extractMealsOfDayOfWeek(this.meals, 'Monday', this.mealsOfMonday);
      this.extractMealsOfDayOfWeek(this.meals, 'Tuesday', this.mealsOfTuesday);
      this.extractMealsOfDayOfWeek(this.meals, 'Wednesday',  this.mealsOfWednesday);
      this.extractMealsOfDayOfWeek(this.meals, 'Thursday',  this.mealsOfThursday);
      this.extractMealsOfDayOfWeek(this.meals, 'Friday',  this.mealsOfFriday);
    });
    console.log(this.meals);
    console.log('la comida del lunes es');
    console.log(this.mealsOfThursday);
    
    
  }
  extraerMenu(menus: MenuAModel[], name: string){
    menus.forEach(element => {
      if (element.name == name){
        this.menu = element;
        this.getMealsByMenuId(this.menu._id);
      }
    });
  }
  extractMealsOfDayOfWeek(meals: PlatoModel[], day: string, list: PlatoModel[]){
    list.length = 0;
    
    meals.forEach(element => {
      if (element.dayOfWeek == day){
        
        list.push(element);
      }
    });
    
  }
  capturar(){
    console.log("1,2,3");
    console.log(this.PayForm.get('offer').value);
    this.opcionSeleccionado=this.PayForm.get('offer').value;
    // this.verSeleccion=this.opcionSeleccionado;
    // console.log(this.opcionSeleccionado);
  }
  pay(){
    console.log("Funcion de pagar");
   
  }
 
  
}
