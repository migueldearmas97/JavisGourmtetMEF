import { Component, OnInit } from '@angular/core';
import { OfertaModel } from '../../models/oferta.model';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { OfertaService } from '../../services/oferta.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css']
})
export class OfertaComponent implements OnInit {
  
  public formSubmitted = false;
  public offerSelected:OfertaModel;
  public offerForm = this.fb.group({
    name: ['', Validators.required],
    price: ['', Validators.required],
  });
  constructor(private router: Router, private fb: FormBuilder, private ofertaService: OfertaService, private activatedRoute: ActivatedRoute) { }
  
  ngOnInit(): void {
    console.log('llego');
    this.activatedRoute.params.subscribe(({id}) => this.getOfferById(id));
  }
  saveOffer(){
    
    this.formSubmitted = true;
    if (this.offerForm.invalid){
      console.log('formulario incorrecto');
      return;
    }
    if(this.offerSelected){
      const data={
        ...this.offerForm.value,
        _id: this.offerSelected._id
      }
      this.ofertaService.actualizarOfertas(data)
      .subscribe(resp => {
        Swal.fire(
          'Exito',
          `La oferta fue actualizada correctamente`,
          'success'
          );
          this.router.navigate(['/administrar']);
        }, (err) => {
          Swal.fire('Error', err.error.msg, 'error' );
        });
        
      }
      else{
        // realizar el posteo 
        this.ofertaService.crearOfertas(this.offerForm.value)
        .subscribe(resp => {
          Swal.fire(
            'Exito',
            `La oferta fue creada correctamente`,
            'success'
            );
            this.router.navigate(['/administrar']);
          }, (err) => {
            Swal.fire('Error', err.error.msg, 'error' );
          });
        }
        
      }
      getOfferById(id: string){
        if ( id === 'nuevo' ) {
          return;
        }
        this.ofertaService.cargarOfertaPorId(id)
        .subscribe(offer => {
          const {name,price}=offer; 
          console.log(name,price);
          this.offerSelected=offer;
          this.offerForm.setValue({name,price});
        })
        
      }
      
      
      invalidField(field: string): boolean{
        if (this.offerForm.get(field).invalid && this.formSubmitted){
          return true;  
        } 
        else{
          return false;
        }
        
      }
      
    }
    