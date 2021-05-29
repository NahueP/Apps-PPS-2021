import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { Usuario } from '../clases/usuario';
import { AuthService } from '../servicios/auth.service';
import { ComplementosService } from '../servicios/complementos.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  
})
export class LoginPage implements OnInit {

  users: Usuario[] = [{ id: 1, email: "admin@admin.com", password: "111111", perfil: "admin", sexo: "femenino", nombre : "Maria"},
  { id: 2, email: "invitado@invitado.com", password: "222222", perfil: "invitado", sexo: "femenino", nombre: "Paula"},
  { id: 3, email: "usuario@usuario.com", password: "333333", perfil: "usuario", sexo: "masculino", nombre: "Nahuel" },
  { id: 4, email: "anonimo@anonimo.com", password: "444444", perfil: "anonimo", sexo: "masculino", nombre: "Ramiro" },
  { id: 5, email: "tester@tester.com", password: "555555", perfil: "tester", sexo: "femenino", nombre: "Ana"}];


  loginForm = this.formBuilder.group({
    email: ['', [Validators.required,Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$')]],
    password: ['', [Validators.required ,Validators.minLength(6)]],
  });

  constructor(private authSvc: AuthService,private formBuilder: FormBuilder,  private complementos : ComplementosService, private router : Router) 
  {

  }

  get email() {
    return this.loginForm.get("email");
  } 
  get password() {
    return this.loginForm.get("password");
  }

  public errorMessages = {
  email: [
    { type: 'required', message: 'Ingrese su correo' },
    { type: 'pattern', message: 'Por favor ingrese un correo valido' }
  ],
  password: [
    { type: 'required', message: 'Ingrese su contraseña' },
    { type: 'minlength', message: 'La contraseña debe tener 6 caracteres como minimo'}
  ]
  };

  submit()
  {
  console.log(this.loginForm.value);
  }

  Limpiar() {
  this.loginForm.setValue({email: null, password: null});
  }


  onLogin()
  {
     const {email,password} = this.loginForm.value;

     this.authSvc.login(email, password).then(res => { 
      
     this.complementos.presentLoadingIngresando();
   

     timer(2000).subscribe(() => {this.router.navigate(['/home']); });
   }).catch(err => this.complementos.ngValidarError(err.code));
  
  }

  pickUser(pickedName) {
  this.users.forEach((user) => {
    if (user.perfil === pickedName) {
      this.loginForm.setValue({email:user.email, password:user.password});
      localStorage.setItem("usuario",JSON.stringify(user));
      return;
    }
  });
  }

  ngOnInit() {
  }

}
