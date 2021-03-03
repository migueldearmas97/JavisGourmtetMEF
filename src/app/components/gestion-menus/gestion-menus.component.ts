import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { MenuAModel } from '../../models/menu-a.model';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-gestion-menus',
  templateUrl: './gestion-menus.component.html',
  styleUrls: ['./gestion-menus.component.css']
})
export class GestionMenusComponent implements OnInit {

  public menus:MenuAModel[]=[];
  public loading:boolean=true;

  constructor(private menuService:MenuService) { }

  ngOnInit(): void {
   this.gettingMenus();

  }
  gettingMenus(){
    this.loading=true;
    this.menuService.cargarMenus()
    .subscribe(resp=>{
    this.loading=false;
    this.menus=resp;
    })
  }
  deleteMenu( menu: MenuAModel ) {
    Swal.fire({
      title: '¿Borrar menu?',
      text: `Esta a punto de borrar a ${ menu.name }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.value) {
        
        this.menuService.eliminarMenu( menu)
          .subscribe( resp => {
            
            this.gettingMenus();
            Swal.fire(
              'Menu borrado',
              `${ menu.name } fue eliminado correctamente`,
              'success'
            );
            
          });

      }
    })

  }

}
