import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-navbar-a',
  templateUrl: './navbar-a.component.html'
})
export class NavbarAComponent implements OnInit {
  public roleVisibility:boolean=false;
  constructor(private usuarioService:UsuarioService) { 

  }

  ngOnInit(): void {
    if(this.usuarioService.role==='ADMIN_ROLE'){
      this.roleVisibility=true;
    }
    console.log(this.roleVisibility);
  }
  logout(){
    this.usuarioService.logout();
  }
}
