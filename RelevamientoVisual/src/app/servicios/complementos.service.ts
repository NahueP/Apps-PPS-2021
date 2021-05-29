import { Injectable } from '@angular/core';
import { ToastController,LoadingController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class ComplementosService {

  constructor(public toastController:ToastController, public loadingController : LoadingController) 
  {
  
  }

  async presentLoading(){
    const loading = await this.loadingController.create({
      spinner: 'dots',
      message: 'Cargando...',
      duration: 2000,
      translucent: true,
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    console.log('Loading dismissed!');
  }

  async presentLoadingIngresando()
  {
    const loading = await this.loadingController.create({
      spinner: 'dots',
      message: 'Iniciando sesión',
      duration: 2000,
      translucent: true,
    });
    await loading.present();

    const { role, data} = await loading.onDidDismiss();

    console.log('Loading dismissed');
  }

  async presentToast(msg) {
    console.log(msg);
    const toast = await this.toastController.create({
      message: msg,
      position: 'bottom',
      duration: 2000,
      color: 'warning',
    buttons: [
      {
        text: 'Aceptar',
        role: 'cancel',
      }
    ]
  });
  toast.present();
  }

  ngValidarError( error ) {
    console.log(error);
    switch (error) {
        case 'auth/argument-error':
          error = 'ERROR: Debe completar todos los campos';
          break;
        case 'auth/invalid-email':
          error = 'ERROR: Formato de email no correcto';
            break;
        case 'auth/user-not-found':
          error = 'ERROR: Usuario no valido';
            break;
        case 'auth/wrong-password':
          error = 'ERROR: Contraseña incorrecta';
              break;
        default:
          error = 'ERROR';
          break;
      }
  
    this.presentToast(error);
    }
  
  
      
      async presentToastConMensaje(mensaje : string) 
      {
        const toast = await this.toastController.create({
          message: mensaje,
          position: 'top',
          duration: 2000,
          color: 'warning',
        buttons: [
          {
            text: 'Aceptar',
            role: 'cancel',
          }
        ]
      });
      toast.present();
      
    }
  

}

