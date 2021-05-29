import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PickerController } from '@ionic/angular';
import { PickerOptions } from '@ionic/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { ComplementosService } from 'src/app/servicios/complementos.service';
import { Usuario } from '../../clases/usuario';
import { timer } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email:string;
  password:string;
  

  users: Usuario[] = [{ id: 1, email: "admin@admin.com", password: "111111", perfil: "admin", sexo: "femenino", nombre : "Maria"},
  { id: 2, email: "invitado@invitado.com", password: "222222", perfil: "invitado", sexo: "femenino", nombre: "Paula"},
  { id: 3, email: "usuario@usuario.com", password: "333333", perfil: "usuario", sexo: "masculino", nombre: "Nahuel" },
  { id: 4, email: "anonimo@anonimo.com", password: "444444", perfil: "anonimo", sexo: "masculino", nombre: "Ramiro" },
  { id: 5, email: "tester@tester.com", password: "555555", perfil: "tester", sexo: "femenino", nombre: "Ana"}];

  constructor(private authSvc: AuthService,private router : Router,private complementos: ComplementosService,private picker : PickerController) { }

  
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
      localStorage.setItem("usuario",JSON.stringify(user));
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

  async showBasicPicker()
  {
    let opts : PickerOptions = {
      buttons:[{
        text:'Cancelar',
        role: 'cancel'
      },
      {
        text: 'Aceptar'
      }
    ],
      columns:[{
        name: 'usuarios',
        options: [
          {text: 'Admin', value: 'AD'},
          {text: 'Invitado', value: 'IN'},
          {text: 'Usuario', value: 'US'},
          {text: 'Anonimo', value: 'AN'},
          {text: 'Tester', value: 'TS'},
        ]

      }]
    };

    let picker = await this.picker.create(opts);
    picker.present();
    picker.onDidDismiss().then(async data=>{
      let col = await picker.getColumn('usuarios');
      let usuario = col.options[col.selectedIndex].value;
      let perfil = col.options[col.selectedIndex].text;
     
      this.pickUser(perfil.toLocaleLowerCase());
      this.autocompleta(usuario);
    })
  }

}
