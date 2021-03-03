import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from "sweetalert2";
import { UserModel } from '../../models/user';
import { UsuarioService } from '../../services/usuario.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  public formSubmitted = false;
  public userSelected:UserModel;
   public userForm = this.fb.group({
    name: ['', Validators.required],
    password: ['', Validators.required],
    password2: ['', Validators.required],
    role: ['', Validators.required],

   }, {
     validators: this.samePasswords('password', 'password2')
   });
  constructor(private fb: FormBuilder, private usuarioService: UsuarioService,
     private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    console.log('llego');
    this.activatedRoute.params.subscribe(({id}) => this.getUserById(id));
  }
  saveUser(){
    this.formSubmitted = true;
    if (this.userForm.invalid){
      console.log('formulario incorrecto');
    return;
    }
    if (this.userSelected){
    const data = {
      ...this.userForm.value,
      _id: this.userSelected._id
    }
    this.usuarioService.actualizarUsuario(data)
.subscribe(resp => {
  Swal.fire(
    'Exito',
    `El usuario fue actualizado correctamente`,
    'success'
  );
  this.router.navigate(['/gestion-usuario']);
}, (err) => {
  Swal.fire('Error', err.error.msg, 'error' );
});

    }
    else{
// realizar el posteo 
this.usuarioService.createUser(this.userForm.value)
.subscribe(resp => {
  Swal.fire(
    'Exito',
    `El usuario fue creado correctamente`,
    'success'
  );
  this.router.navigate(['/gestion-usuario']);
}, (err) => {
  Swal.fire('Error', err.error.msg, 'error' );
});
    }
    
  }
  getUserById(id: string){
    if ( id === 'nuevo' ) {
      return;
    }
    this.usuarioService.cargarUsuarioPorId(id)
    .subscribe(user => {
      const {name, role,password} = user; 
      const password2=password;
      this.userSelected = user;
      this.userForm.setValue({name, password,password2,role});
    })

  }
 invalidField(field: string): boolean{
  if (this.userForm.get(field).invalid && this.formSubmitted){
    return true;  
  } 
  else{
    return false;
  }
  
 };
 notEqualsPassword(): boolean{
  const pass1 = this.userForm.get('password').value;
  const pass2 = this.userForm.get('password2').value;

  if (  (pass1 !== pass2) && this.formSubmitted){
    return true;
  }
  else{
    return false;
  }
  
 };
 samePasswords(pass1Name: string, pass2Name: string){
   return (formGroup: FormGroup) => {
    const pass1Control = formGroup.get(pass1Name);
    const pass2Control = formGroup.get(pass2Name);
    if (pass1Control.value === pass2Control.value){
      pass2Control.setErrors(null);
    }
    else{
      pass2Control.setErrors({diferentPassword: true});
    }

   }
 }

}
