import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from '../servicios/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router : Router, private authSvc : AuthService) {}

  async onLogout()
  {
           try
           {
             await this.authSvc.logout();
             this.router.navigate(['/login']);
           }
           catch(error)
           {
             console.log(error);
             
           }
  }


  cambiarAlarma()
  {
    this.router.navigate(['/activado']);
  }

}