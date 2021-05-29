import { Component } from '@angular/core';
import { Router } from "@angular/router";//Para navegar en paginas
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { Platform } from '@ionic/angular';
import { AuthService } from '../servicios/auth.service';
import { ComplementosService } from "../servicios/complementos.service";
import Swal from 'sweetalert2';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  acumuladorCreditos: number = 0;
  scanSub : any;
  valorObtenido;
  contadores = {contadorDiez : 0, contadorCiencuenta : 0, contadorCien : 0};


  obtenerUsuario = localStorage.getItem("usuario");
  usuario = JSON.parse(this.obtenerUsuario);

  nombreDelUsuario = this.usuario.nombre;
  correoDelUsuario = this.usuario.email;
  tipoDeUsuario = this.usuario.perfil;

  qrScan:any;


  constructor(
    public router : Router,
    private qrScanner: QRScanner, 
    public plataform:Platform,
    private complementos : ComplementosService , private authSvc: AuthService) {


      this.plataform.backButton.subscribeWithPriority(0,() => {
      document.getElementsByTagName("body")[0].style.opacity = "1";
      this.qrScan.unsubscribe();
    })
  }

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
       alert(error);
     }
  }



  CerrarSesion()
  {
    this.contadores.contadorCien = 0;
    this.contadores.contadorCiencuenta = 0;
    this.contadores.contadorDiez = 0;
    this.acumuladorCreditos = 0;
      localStorage.setItem("usuario", null);
      this.onLogout();

  }

  ActualizarSaldo(){



    this.acumuladorCreditos = this.acumuladorCreditos;

  }


  scannerStarting()
  {
    
      this.qrScanner.prepare().then((status:QRScannerStatus) => {

        if(status.authorized)
        {
          this.qrScanner.show();
          document.getElementsByTagName("body")[0].style.opacity = "0";
         this.qrScan = this.qrScanner.scan().subscribe((textFound) => {

          document.getElementsByTagName("body")[0].style.opacity = "1";
          
          //alert("Escaneo con exito!");
          console.log(textFound);
          this.qrScan.unsubscribe();

          //Se carga 100
          if(textFound == "2786f4877b9091dcad7f35751bfcf5d5ea712b2f")
          {
            if(this.contadores.contadorCien != 1 && this.contadores.contadorCien != 2)
            {
              this.contadores.contadorCien = 1;
              this.acumuladorCreditos += 100;
              this.complementos.presentToastConMensajeYColor("El credito se cargó correctamente", "success");
            }
            else
            {
              if(this.usuario.perfil == "admin" && this.contadores.contadorCien == 1){
                this.contadores.contadorCien = 2;
                this.acumuladorCreditos += 100;
                this.complementos.presentToastConMensajeYColor("El credito se cargó correctamente al usuario Administrador", "success");
              }
              else
              {
                this.complementos.presentToastConMensajeYColor("Error. No se puede cargar mas crédito.", "danger");
              }
              
            }
          }

          //Se carga 10
          if(textFound == "8c95def646b6127282ed50454b73240300dccabc")
          {
            if(this.contadores.contadorDiez != 1 && this.contadores.contadorDiez != 2)
            {
              this.contadores.contadorDiez = 1;
              this.acumuladorCreditos += 10;
              this.complementos.presentToastConMensajeYColor("El credito se cargó correctamente", "success");
            }
            else
            {
              if(this.usuario.perfil == "admin" && this.contadores.contadorDiez == 1){
                
                this.contadores.contadorDiez = 2;
                this.acumuladorCreditos += 10;
                this.complementos.presentToastConMensajeYColor("El credito se cargó correctamente al usuario Administrador", "success");
              }
              else
              {
                this.complementos.presentToastConMensajeYColor("Error. No se puede cargar mas crédito.", "danger");
              }
            }
          }

          //Se carga 50
          if(textFound == "ae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172 ")
          {             
            if(this.contadores.contadorCiencuenta != 1 && this.contadores.contadorCiencuenta != 2)
            {
              this.contadores.contadorCiencuenta = 1;
              this.acumuladorCreditos += 50;
              this.complementos.presentToastConMensajeYColor("El credito se cargó correctamente", "success");
            }
            else
            {
              if(this.usuario.perfil == "admin" && this.contadores.contadorCiencuenta == 1){
                
                this.contadores.contadorCiencuenta = 2;
                this.acumuladorCreditos += 50;
                this.complementos.presentToastConMensajeYColor("El credito se cargó correctamente al usuario Administrador", "success");
              }
              else
              {
                this.complementos.presentToastConMensajeYColor("Error. No se puede cargar mas crédito.", "danger");
              }
            }
          }


          },(err) =>{
            alert(JSON.stringify(err));
          })
        }
        else if(status.denied)
        {

        }
        else{

        }

      })
  }

  limpiarCreditos()
  {
    Swal.fire({
      title: '¿Seguro que desea eliminar los creditos?',
      text: "No se podrán revertir los cambios",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: '¡Si, Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) 
      {
        this.contadores.contadorCien = 0;
        this.contadores.contadorCiencuenta = 0;
        this.contadores.contadorDiez = 0;
        this.acumuladorCreditos = 0;
        Swal.fire(
          'Eliminado!',
          'Los creditos se han eliminado.',
          'success'
        )
        
      }
    })

    
    
  }

}
