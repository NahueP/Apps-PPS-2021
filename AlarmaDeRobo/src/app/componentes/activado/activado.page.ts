import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceMotion, DeviceMotionAccelerationData, DeviceMotionAccelerometerOptions } from '@ionic-native/device-motion/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';
import { Flashlight } from '@ionic-native/flashlight/ngx';
import {ComplementosService} from "../../servicios/complementos.service"
import { timer } from 'rxjs';

@Component({
  selector: 'app-activado',
  templateUrl: './activado.page.html',
  styleUrls: ['./activado.page.scss'],
})
export class ActivadoPage implements OnInit {

  password = "";

  x: string;

  y: string;
  z: string;
  timeStamp: string;

  capo: string;
  flag = false;

  xNum: number;
  yNum: number;
  zNum: number;

  audioHorizontalUno = new Audio();
  audioHorizontalFinal = new Audio();
  audioVertical = new Audio();
  audioIzquierda = new Audio();
  audioDerecha = new Audio();

  activado = false;

  flagHorizontalUno = false;
  flagHorizontalFinal = false;
  flagVertical = false;
  flagIzquierda = false;
  flagDerecha = false;
  flagEntraFinal = false;

  newStyle = false;

  id: any;


  constructor(public router : Router,
    private deviceMotion: DeviceMotion,
    private vibration: Vibration,
    private flash: Flashlight,
    private complementos : ComplementosService
    ) { 

    this.x = '-';
    this.y = '-';
    this.z = '-';
    this.timeStamp = '-';

  }

  ngOnInit() {

    try {
      const option: DeviceMotionAccelerometerOptions = {
        frequency: 200
      };

      this.id = this.deviceMotion.watchAcceleration(option)
      .subscribe((acc: DeviceMotionAccelerationData) => {
        this.x = '' + acc.x;
        this.z = '' + acc.z;
        this.y = '' + acc.y;
        this.timeStamp = '' + acc.timestamp;

        this.xNum = Number(this.x);
        this.yNum = Number(this.y);
        this.zNum = Number(this.z);

        if ( (this.xNum >= -1 && this.xNum <= 2 ) && (this.yNum >= -1 && this.yNum <= 6) && (this.zNum >= 5 && this.zNum <= 13) ) {

          if (this.flag === true) 
          {
            this.vibration.vibrate(5000);
            timer(5000).subscribe(() => {

            this.audioHorizontalFinal.load();

             });
            this.capo = 'otro sound';
            this.audioHorizontalFinal = new Audio();
            this.audioHorizontalFinal.src = `assets/audio/alertaUno.mp3`;
            this.audioHorizontalUno.load();
            this.flagEntraFinal = true;
            this.flash.switchOff();
            this.flag = false;
            this.audioIzquierda.load();
            this.audioDerecha.load();
            this.audioVertical.load();
            this.audioHorizontalFinal.play();
            this.flagHorizontalFinal = true;


          } else {
            if (this.flagHorizontalUno === false && this.flagEntraFinal === false) {
              this.capo = 'horizontal';

            }

            this.flagVertical = false;
            this.audioVertical.load();
            this.flagIzquierda = false;
            this.flagDerecha = false;

          }


        } else if ((this.xNum >= -1 && this.xNum <= 2 ) && (this.yNum >= 7 && this.yNum <= 11) && (this.zNum >= -2 && this.zNum <= 5)) {

          if (this.flagVertical === false) {
            this.flash.switchOn();
            timer(5000).subscribe(() => {
                this.flash.switchOff();
                this.audioVertical.load();
            });

            this.audioVertical = new Audio();
            this.audioVertical.src = `assets/audio/alertaDos.mp3`;
            this.audioHorizontalFinal.load();
            this.audioHorizontalUno.load();
            this.audioIzquierda.load();
            this.audioDerecha.load();
            this.audioVertical.play();
            this.flagVertical = true;
            this.capo = 'vertical';

          }
          
          this.flagHorizontalUno = false;
          this.flagIzquierda = false;
          this.flagDerecha = false;

          this.flag = true;


        } else if ((this.xNum >= 6 && this.xNum <= 11 ) && (this.yNum >= -2 && this.yNum <= 6) && (this.zNum >= -5 && this.zNum <= 5)) {

          if (this.flagIzquierda === false) {
            this.capo = 'izquierda';

            this.flash.switchOff();
            this.audioIzquierda = new Audio();
            this.audioIzquierda.src = `assets/audio/alertaTres.mp3`;
            this.audioIzquierda.play();
            this.audioHorizontalFinal.load();
            this.audioHorizontalUno.load();
            this.audioVertical.load();
            this.audioDerecha.load();

            this.flagIzquierda = true;
          }
          this.audioIzquierda.loop = true;
          this.flagHorizontalUno = false;
          this.flagVertical = false;
          this.audioVertical.load();
          this.flagDerecha = false;

          this.flag = true;


       } else if ((this.xNum <= -6 && this.xNum >= -11 ) && (this.yNum >= -2 && this.yNum <= 6) && (this.zNum >= -5 && this.zNum <= 5)) {
          if (this.flagDerecha === false) {
            this.capo = 'DERECHA';
            this.flash.switchOff();

            this.audioDerecha = new Audio();
            this.audioDerecha.src = `assets/audio/alertaCuatro.mp3`;
            this.audioDerecha.play();
            this.audioHorizontalFinal.load();
            this.audioHorizontalUno.load();
            this.audioVertical.load();
            this.audioIzquierda.load();

            this.flagDerecha = true;
          }
          this.audioDerecha.loop = true;
          this.flagHorizontalUno = false;
          this.flagVertical = false;
          this.audioVertical.load();
          this.flagIzquierda = false;

          this.flag = true;

         } 
      });
    } catch (err) {
      alert('Error ' + err);

    }



}

  cambiarBotonPrincipal()
  {
    let obtenerContra = localStorage.getItem("password");


    if (this.password === "")
    {
      this.complementos.presentToastConMensaje("¡Debe ingresar una contraseña!");
    }


    else if(obtenerContra === this.password)
    {
      this.password="";
      this.id.unsubscribe();
      this.router.navigate(['/home']);
    }

    else
    {
      this.complementos.presentToastConMensaje("¡Contraseña incorrecta!");
    }

  }



  stop()
  {
    this.id.unsubscribe();
  }

}
