import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { UserModel } from '../../models/user';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-gestion-usuarios',
  templateUrl: './gestion-usuarios.component.html',
  styleUrls: ['./gestion-usuarios.component.css']
})
export class GestionUsuariosComponent implements OnInit {

  public users:UserModel[]=[];
  public loading:boolean=true;

  constructor(private usuarioService:UsuarioService) { }

  ngOnInit(): void {
   this.gettingUsers();

  }
  gettingUsers(){
    this.loading=true;
    this.usuarioService.cargarUsuarios()
    .subscribe(resp=>{
    this.loading=false;
    this.users=resp;
    })
  }
  deleteUser( user: UserModel ) {
    Swal.fire({
      title: '¿Borrar usuario?',
      text: `Esta a punto de borrar a ${ user.name }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.value) {
        
        this.usuarioService.eliminarUsuario( user)
          .subscribe( resp => {
            
            this.gettingUsers();
            Swal.fire(
              'Usuario borrado',
              `${ user.name } fue eliminado correctamente`,
              'success'
            );
            
          });

      }
    })

  }

}
