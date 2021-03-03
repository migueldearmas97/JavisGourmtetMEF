import { Component, OnInit } from '@angular/core';
import { OfertaModel } from 'src/app/models/oferta.model';
import { OfertaService } from '../../services/oferta.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuService } from '../../services/menu.service';
import { MenuAModel } from 'src/app/models/menu-a.model';
import { PlatoModel } from '../../models/plato.model';
import { PlatoService } from '../../services/plato.service';
import { ConstantPool } from '@angular/compiler';




@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public offers: OfertaModel[] = [];
  public meals: PlatoModel[] = [];


  public mealsOfMonday: PlatoModel[] = [];
  public mealsOfTuesday: PlatoModel[] = [];
  public mealsOfWednesday: PlatoModel[] = [];
  public mealsOfThursday: PlatoModel[] = [];
  public mealsOfFriday: PlatoModel[] = [];


  public menu: MenuAModel;
 
  public dayOfWeek: string[] = [];


  constructor(private ofertaService: OfertaService, private activatedRoute: ActivatedRoute, private menuService: MenuService, private platoService: PlatoService,private router:Router) { }

  ngOnInit(): void {
    
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
  renderizarPagina(){
    console.log('presiono clic');
    
   
  }
  

}
