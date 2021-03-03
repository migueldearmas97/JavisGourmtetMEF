import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuAModel } from 'src/app/models/menu-a.model';
import { MenuService } from '../../../services/menu.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  public menus: MenuAModel[] = [];
  public defaultMenu: MenuAModel;

  
  

  constructor(private menusService: MenuService) { }

  ngOnInit(): void {
    this.gettingMenus();

  }

  gettingMenus(){
  
    this.menusService.cargarMenus()
    .subscribe(resp => {
  
    this.menus = resp;
    if(this.menus.length>0){
      this.defaultMenu=this.menus[0];
    }

  });

  }
}
