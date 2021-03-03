import { Component, OnInit } from '@angular/core';
import { MenuAModel } from '../../models/menu-a.model';

import { FormBuilder, NgForm, Validators } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-menu-a',
  templateUrl: './menu-a.component.html',
  styleUrls: ['./menu-a.component.css']
})
export class MenuAComponent implements OnInit {
 
   public formSubmitted = false;
  public menuSelected:MenuAModel;
  public menuForm = this.fb.group({
   name: ['', Validators.required],
   description: ['', Validators.required],
  });
  constructor(private router: Router, private fb: FormBuilder, private menuService: MenuService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    console.log('llego');
    this.activatedRoute.params.subscribe(({id}) => this.getMenuById(id));
  }
  saveMenu(){
    this.formSubmitted = true;
    if (this.menuForm.invalid){
      console.log('formulario incorrecto');
    return;
    }
    if(this.menuSelected){
    const data={
      ...this.menuForm.value,
      _id: this.menuSelected._id
    }
    this.menuService.actualizarMenu(data)
.subscribe(resp => {
  Swal.fire(
    'Exito',
    `El menu fue actualizado correctamente`,
    'success'
  );
  this.router.navigate(['/gestion-menus']);
}, (err) => {
  Swal.fire('Error', err.error.msg, 'error' );
});

    }
    else{
// realizar el posteo 
this.menuService.crearMenus(this.menuForm.value)
.subscribe(resp => {
  Swal.fire(
    'Exito',
    `El menu fue creado correctamente`,
    'success'
  );
  this.router.navigate(['/gestion-menus']);
}, (err) => {
  Swal.fire('Error', err.error.msg, 'error' );
});
    }
    
  }
  getMenuById(id: string){
    if ( id === 'nuevo' ) {
      return;
    }
    this.menuService.cargarMenuPorId(id)
    .subscribe(menu => {
      const {name,description}=menu; 
      console.log(name,description);
      this.menuSelected=menu;
      this.menuForm.setValue({name,description});
    })

  }


  invalidField(field: string): boolean{
    if (this.menuForm.get(field).invalid && this.formSubmitted){
      return true;  
    } 
    else{
      return false;
    }
    
   }
 
}
