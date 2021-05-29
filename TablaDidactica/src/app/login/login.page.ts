import { Component, OnInit } from '@angular/core';
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

  email:string;
  password:string;
  
  

  constructor(private authSvc: AuthService,  private complementos : ComplementosService, private router : Router) 
  {

  }



  


  Limpiar() {
    this.email = null;
    this.password = null;
  }


  onLogin()
  {
    
     this.authSvc.login(this.email, this.password).then(res => { 
      
     this.complementos.presentLoading();
   

     timer(2000).subscribe(() => {this.router.navigate(['/home']); });
   }).catch(err => this.complementos.ngValidarError(err.code));
  
  }

  pickUser(pickedName) {
  this.users.forEach((user) => {
    if (user.perfil === pickedName) {
      this.email = user.email;
      this.password = user.password;
      return;
    }
  });
  }

  autocompleta( value: string ){
    switch(value){
      case 'AD': {
        this.email="admin@admin.com";
        this.password="111111";
        break;
      }
      case 'AN':{
        this.email="anonimo@anonimo.com";
        this.password="444444";
        break;
      }
      case 'IN':{
        this.email="invitado@invitado.com";
        this.password="222222";
        break;
      }
      case 'TS':{
        this.email="tester@tester.com";
        this.password="555555";
        break;
      }
      case 'US':  {
        this.email="usuario@usuario.com";
        this.password="333333";
        break;
      }
    }
  }

  ngOnInit() {
  }

}
