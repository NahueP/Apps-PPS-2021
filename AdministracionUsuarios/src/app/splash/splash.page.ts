import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
const { SplashScreen } = Plugins;


@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {

  constructor(public router: Router, private platform: Platform) 
  { 
    this.initializeApp();
    this.splashAnimado();
  }

  initializeApp()
  {
  
    this.platform.ready().then(()=>{
      
       setTimeout(()=> {
         SplashScreen.hide();
       },50);
      
    });
    
    
  }

  splashAnimado()
  {
    setTimeout(()=>{
      this.router.navigate(['login'],{replaceUrl:true});
    },5000);
  }

  ngOnInit() {
  }

}
