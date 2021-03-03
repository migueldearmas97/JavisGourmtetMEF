import { Component, OnInit } from '@angular/core';
import { OfertaService } from '../../services/oferta.service';
import { OfertaModel } from '../../models/oferta.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-administrar',
  templateUrl: './administrar.component.html',
  styleUrls: ['./administrar.component.css'
]
})
export class AdministrarComponent implements OnInit {

  public offers:OfertaModel[]=[];
  public loading:boolean=true;

  constructor(private ofertaService:OfertaService) { }

  ngOnInit(): void {
   this.gettingOffers();

  }
  gettingOffers(){
    this.loading=true;
    this.ofertaService.cargarOfertas()
    .subscribe(resp=>{
    this.loading=false;
    this.offers=resp;
    })
  }
  deleteOffer( offer: OfertaModel ) {
    Swal.fire({
      title: '¿Borrar oferta?',
      text: `Esta a punto de borrar a ${ offer.name }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarla'
    }).then((result) => {
      if (result.value) {
        
        this.ofertaService.eliminarOfertas( offer)
          .subscribe( resp => {
            
            this.gettingOffers();
            Swal.fire(
              'Oferta borrada',
              `${ offer.name } fue eliminada correctamente`,
              'success'
            );
            
          });

      }
    })

  }
}
