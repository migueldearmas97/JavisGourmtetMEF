import { Component, OnInit } from '@angular/core';
import { OfertaModel } from '../../models/oferta.model';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { OfertaService } from '../../services/oferta.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { PlatoModel } from 'src/app/models/plato.model';
import { PlatoService } from '../../services/plato.service';
import { MenuAModel } from 'src/app/models/menu-a.model';
import { MenuService } from '../../services/menu.service';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-plato',
  templateUrl: './plato.component.html',
  styleUrls: ['./plato.component.css']
})
export class PlatoComponent implements OnInit {

  public formSubmitted = false;
  public imagenSubir: File;
  public imgTemp: any = null;
  public imgSource: any = null;

  public mealSelected:PlatoModel;
  public menus:MenuAModel[]=[];
  public menuSelected:MenuAModel;
  public imgLoaded:string;


  public mealForm = this.fb.group({
   name: ['', Validators.required],
   ingredients: ['', Validators.required],
   dayOfWeek: ['', Validators.required],
   menu: ['', Validators.required],


  });

  constructor(private router: Router,
              private fb: FormBuilder,
              private platoService: PlatoService,
              private menuService:MenuService,
              private activatedRoute: ActivatedRoute,
              private fileUploadService: FileUploadService) {
               }

  ngOnInit(): void {


    this.cargarMenus();

    this.activatedRoute.params.subscribe(({id}) => this.getMealById(id));



    this.mealForm.get('menu').valueChanges
        .subscribe( menuId => {
          this.menuSelected = this.menus.find( m => m._id === menuId );
        })
  }
  saveMeal(){
    this.formSubmitted = true;
    console.log(this.mealForm.value);

    if (this.mealForm.invalid){
      console.log('formulario incorrecto');
      return;
    }
  


    if(this.mealSelected){
      let data=null;
      if(!this.imgTemp){
        data={
          ...this.mealForm.value,
          _id: this.mealSelected._id,
          img:this.imgSource
        };
      }
      else{
        data={
          ...this.mealForm.value,
          _id: this.mealSelected._id,
          img:this.imgTemp
        };
      }

     
      this.platoService.actualizarPlato(data)
.subscribe(resp => {
  Swal.fire(
    'Exito',
    `El plato fue actualizado correctamente`,
    'success'
  );
 
  if(this.imgTemp){
    this.subirImagen();
  }
  else{
    this.router.navigate(['/gestion-platos']);
  }
 

}, (err) => {
  Swal.fire('Error', 'Error por favor cambie la imagen a subir y si el error persiste contacte al administrador', 'error' );
});

    }
    else{
// realizar el posteo
let data=null;
if(!this.imgTemp){
  data={
    ...this.mealForm.value,
    img:this.imgSource
  };
}
else{
  data={
    ...this.mealForm.value,
    // img:this.imgTemp
  };
}
this.platoService.crearPlato(data)
.subscribe(resp => {
  Swal.fire(
    'Exito',
    `El plato fue creado correctamente`,
    'success'
  );
  
  if(this.imgTemp){
    console.log('entro');
    this.subirImagen();
  }
  else{
    this.router.navigate(['/gestion-platos']);
  }
 
}, (err) => {
  Swal.fire('Error', err.error.msg, 'error' );
});
    }


  }
  getMealById(id: string){
    if ( id === 'nuevo' ) {
      return;
    }
    this.platoService.cargarPlatoPorId(id)
    .subscribe(meal => {
      const {name,ingredients,dayOfWeek,img,menu}=meal;

      this.mealSelected=meal;
      this.imgSource=img;


      this.mealForm.setValue({name,ingredients,dayOfWeek,menu});
      // this.establecerMenu();

    });

  }


  invalidField(field: string): boolean{
    if (this.mealForm.get(field).invalid && this.formSubmitted){
      return true;
    }
    else{
      return false;
    }

   }
   cargarMenus(){
    this.menuService.cargarMenus().subscribe(menus=>{

      this.menus=menus;
      console.log(this.menus);


    });


   }
   cambiarImagen( file: File ) {
     console.log(file);
     this.imagenSubir = file;

     if ( !file ) {
      return this.imgTemp = null;
    }

     const reader = new FileReader();
     reader.readAsDataURL( file );

     reader.onloadend = () => {
      this.imgTemp = reader.result;

      this.imgSource=null;
    };

  }

  subirImagen() {

    this.platoService.buscarPLatoPorNombre(this.mealForm.value)
    .subscribe(meal => {
      const {_id}=meal;

      this.fileUploadService
      .actualizarFoto( this.imagenSubir, _id )
      .then( img => {
        this.router.navigate(['/gestion-platos']);
        // this.mealForm.patchValue({img:name});
        // Swal.fire('Guardado', 'Imagen de usuario actualizada', 'success');
      }).catch( err => {
        console.log(err);
        Swal.fire('Error', 'No se pudo subir la imagen', 'error');
      });


    });

  }

}
