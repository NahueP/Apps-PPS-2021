import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import * as firebase from 'firebase/app';
import { AngularFireStorage } from "@angular/fire/storage";
import { ComplementosService } from '../../servicios/complementos.service';
import { Router } from '@angular/router';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import { AuthService } from 'src/app/servicios/auth.service';


@Component({
  selector: 'app-cosas-lindas',
  templateUrl: './cosas-lindas.page.html',
  styleUrls: ['./cosas-lindas.page.scss'],
})
export class CosasLindasPage implements OnInit {

  mostrarUnicaFoto = false;
  users: any;

  listadoImagenes = [];
  listado = [];
  linkFoto : string;
  usuarioFoto : string; //nombre del usuario que subio la foto, lo muestro en la card debajo de la votacion.
  fotoVotos : number;
  

  constructor(public camera: Camera, private authSvc : AuthService,private st: AngularFireStorage, private FirestoreService: FirestoreService, private complementos : ComplementosService, private router: Router) { }

  cantidadVotos()
  {
    if(this.fotoVotos!=0)
    {
      this.fotoVotos=0;
    }
    
    this.listado.forEach(element => {
      
      if(element.imagen == this.linkFoto)
      { 
        this.fotoVotos = parseInt(element.votos.length);
      }
      
    });
    
  }

  ngOnInit() {
    this.complementos.presentLoading();
    this.ObtenerListadoDeImagenes();
    this.FirestoreService.ObtenerTodos('fotosLindas').subscribe(imagenesSnapShot=>{
      imagenesSnapShot.forEach((response):any =>{
        let imagen : any = response.payload.doc.data();
        imagen.id = response.payload.doc.id;
       
        this.listado.push(imagen);

       
      });
    });
    
  }

  captureAndUploadToFirebaseStorage()
  {
    const options: CameraOptions = {
      quality: 100,
      targetHeight: 600,
      targetWidth: 600,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    }

    this.camera.getPicture(options).then((imagenData)=>{
      var base64Str = 'data:image/jpeg;base64,' + imagenData;
      var storageRef = firebase.default.storage().ref();
      var obtenerMs = new Date().getTime();

      var obtenerUsuario = localStorage.getItem("usuario");
      var usuarioJson = JSON.parse(obtenerUsuario);
      var nombreFoto = "cosasLindas/" + obtenerMs + "." + usuarioJson.nombre + ".jpg";
      var childRef = storageRef.child(nombreFoto);

      childRef.putString(base64Str,'data_url').then(function(snapshot)
      {
        this.ObtenerListadoDeImagenes();
        this.complementos.presentToastConMensaje("¡Lista cargada con éxito!");
      })
    },(error)=>{
      alert(JSON.stringify(error));
    })
  }

  ObtenerListadoDeImagenes()
  {
    let auxLista = [];
  
    this.st.storage.ref('cosasLindas/').listAll().then((lista)=>{
      lista.items.forEach(item=>{
        item.getDownloadURL().then((link)=>{
          let datos = item.name.split('.');
          let milisegundos = new Date(parseInt(datos[0]));
          let nombre = datos[1] + " - " + milisegundos.toLocaleDateString();
          

          let archivo = { nombre : item.name , link: link, fecha : milisegundos, usuario: nombre};
          
         
          auxLista.push(archivo);
    

          this.listadoImagenes = auxLista;
          
        })
      })
    })

    setTimeout(()=>{this.ordenarPorFecha(this.listadoImagenes)},2000);
  }


  mostrarImagen(link,nombre)
  {
    this.mostrarUnicaFoto = true;
    this.linkFoto = link;
    this.usuarioFoto = nombre;
    
  
    
  }

  esconderFoto()
  {
    this.mostrarUnicaFoto = false;
  }

  evaluarFoto()
  {
    let votos = [];
    var obtenerUsuario = localStorage.getItem("usuario");

    var usuarioJson = JSON.parse(obtenerUsuario);
    votos.push(usuarioJson.email);
    var foto =  {'imagen':this.linkFoto , 'votos':votos}
    let banderaVotos = false;
    let banderaExisteImagen = false;

    this.listado.forEach(imagen =>{

      if(imagen.imagen == this.linkFoto )
      {
         
          banderaExisteImagen = true;
          imagen.votos.forEach(usuario => {
            
            if(usuario == usuarioJson.email )
            {
              banderaVotos  = true;
              this.complementos.presentToastConMensaje('¡Usted ya votó esta foto previamente!');
              
            }
          })

          if(!banderaVotos)
          {
            imagen.votos.push(usuarioJson.email);
            this.FirestoreService.Actualizar('fotosLindas', imagen, imagen.id);
            this.complementos.presentToastConMensaje("¡Votación Relizada!");
            
            
          }
          
      }

    })

    if(!banderaExisteImagen)
    {
      this.FirestoreService.Crear('fotosLindas', foto);
      this.complementos.presentToastConMensaje("¡Votación Relizada!");
      
    }

  }

  ordenarPorFecha(lista)    
  { 
    lista.sort(function (a, b) {            
    if (a.fecha > b.fecha) 
    {                
      return -1;       
    }       
    if (a.fecha < b.fecha) 
    { 
      return 1; 
    }
    
    return 0;});    
    this.listadoImagenes = lista;       
  }


  refrescarListado()
  {
    location.reload();
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



}
