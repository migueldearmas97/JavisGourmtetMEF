import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators,FormControl,FormGroup} from '@angular/forms';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  public formSubmitted=false;
  public loginForm=this.fb.group({
   name: ['', Validators.required],
   password: ['', Validators.required],
  });
  constructor(private router: Router,private fb:FormBuilder,private usuarioService:UsuarioService) { }

  login(){
  this.formSubmitted=true;
  if(this.loginForm.invalid){
    console.log('formulario incorrecto');
  return;
  }
  
  // realizar el posteo 
  this.usuarioService.loginUser(this.loginForm.value)
  .subscribe(resp=>{
    this.router.navigate(['/administrar']);
  },(err)=>{
    Swal.fire('Error', err.error.msg, 'error' );
  });
}
invalidField(field:string):boolean{
  if(this.loginForm.get(field).invalid && this.formSubmitted){
    return true;  
  } 
  else{
    return false;
  }
  
 }
}
