import { Component, OnInit } from '@angular/core';
import { PlatoModel } from 'src/app/models/plato.model';
import Swal from 'sweetalert2';
import { PlatoService } from '../../services/plato.service';
import { MenuService } from '../../services/menu.service';
import { MenuAModel } from 'src/app/models/menu-a.model';



@Component({
  selector: 'app-gestion-platos',
  templateUrl: './gestion-platos.component.html',
  styleUrls: ['./gestion-platos.component.css']
})
export class GestionPlatosComponent implements OnInit {

  public meals: PlatoModel[] = [];
  public menus: MenuAModel[] = [];


  public loading: boolean = true;

  public menusName: MenuAModel = null;

  constructor(private platoService: PlatoService, private menuService: MenuService) {
    this.gettingMeals();
  }

  ngOnInit(): void {

    this.gettingMeals();


  }
  gettingMeals(){
    this.loading = true;
    this.platoService.cargarPlatos()
    .subscribe(resp => {
    this.loading = false;
    this.meals = resp;

    });

  }

  deleteMeal( meal: PlatoModel ) {
    Swal.fire({
      title: '¿Borrar plato?',
      text: `Esta a punto de borrar a ${ meal.name }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.value) {

        this.platoService.eliminarPlato( meal)
          .subscribe( resp => {

            this.gettingMeals();
            Swal.fire(
              'Plato borrado',
              `${ meal.name } fue eliminado correctamente`,
              'success'
            );

          });

      }
    });

  }
  



}
