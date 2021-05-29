import { Injectable } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})

export class ComplementosService {

  constructor(public toastController: ToastController, public loadingController: LoadingController,
    ) { }



  async presentLoading() {
    const loading = await this.loadingController.create({
      spinner: 'circular',
      message: 'Cargando...',
      duration: 2000,
      translucent: true,

    });
    await loading.present();
  
    const { role, data } = await loading.onDidDismiss();
  
    console.log('Loading dismissed!');
  }
  
  

  async presentToast(msg) {
    console.log(msg);
    const toast = await this.toastController.create({
      message: msg,
      position: 'bottom',
      duration: 2000,
      color: 'primary',
    buttons: [
      {
        text: 'Aceptar',
        role: 'cancel',
      }
    ]
  });
  toast.present();
  }
  



ngValidarError( err ) {
  console.log(err);
  switch (err) {
      case 'auth/argument-error':
        err = 'ERROR: Debe completar todos los campos';
        break;
      case 'auth/invalid-email':
          err = 'ERROR: Formato de email no correcto';
          break;
      case 'auth/user-not-found':
          err = 'ERROR: Usuario no valido';
          break;
      case 'auth/wrong-password':
            err = 'ERROR: Contraseña incorrecta';
            break;
      default:
        err = 'ERROR';
        break;
    }

this.presentToast(err);
  }


  
// Muestro el toast, mensaje de error. 
async presentToastConMensajeYColor(mensaje : string, color : string) {
  const toast = await this.toastController.create({
    message: mensaje,
    position: 'top',
    duration: 3000,
    color: color,
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








