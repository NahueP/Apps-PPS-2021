import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  srcDefaultPaises = "assets/paises/esp.png";
  srcDefaultTemas = 'assets/temas/colores.png';

  mostrar = 'colores';
  idioma = 'español';
  acentoIdioma = 'español';
  titulo = '';

  constructor(private authSvc: AuthService, private router: Router) {}

  cambiarIdioma( idioma: string) {

    
    this.idioma = idioma;
    if (idioma === 'ingles') {
      this.acentoIdioma = 'inglés';
      this.srcDefaultPaises = 'assets/paises/uk.png';
    } 
    else if (this.idioma === 'portugues') {
      this.acentoIdioma = 'portugués';
      this.srcDefaultPaises = 'assets/paises/br.png';
    } 
    else {
      this.acentoIdioma = 'español';
      this.srcDefaultPaises = 'assets/paises/esp.png';
    }
  }

  cambiarTema( tema: string) {

    this.mostrar = tema;

    if (tema  === 'colores') {
      this.srcDefaultTemas = 'assets/temas/colores.png';
    } else if ( tema === 'numeros') {
      this.srcDefaultTemas = 'assets/temas/numeros.png';
    } else {
      this.srcDefaultTemas = 'assets/temas/animales.png';
    }
  }

  reproducir(tema: string, valor: string) {

    let audio = new Audio();
    let path: string;

    path = this.traducirTemas(tema, valor);

    audio.src = `assets/audios/${path}`;

    audio.load();
    audio.play();
  }


  traducirTemas(tema: string , valor: string) {

    let retorno: string;
  
      if (tema === 'colores') {
         retorno = this.traducirColor(valor);
  
      } else if (tema === 'numeros') {
         retorno = this.traducirNumero(valor);
  
      } else {
        retorno = this.traducirAnimales(valor);
      }
  
      return retorno;
    }

    traducirAnimales(valor: string) {
      if (this.idioma === 'español') {
        switch (valor) {
          case 'perro':
            return 'animales/esp_perro.mp3';
          case 'gato':
            return 'animales/esp_gato.mp3';
          case 'pez':
            return 'animales/esp_pez.mp3';
          case 'vaca':
            return 'animales/esp_vaca.mp3';
          case 'pajaro':
            return 'animales/esp_pajaro.mp3';
          default:
            break;
        }
      } else if (this.idioma === 'ingles') {
        switch (valor) {
          case 'perro':
            return 'animales/uk_dog.mp3';
          case 'gato':
            return 'animales/uk_cat.mp3';
          case 'pez':
            return 'animales/uk_fish.mp3';
          case 'vaca':
            return 'animales/uk_cow.mp3';
          case 'pajaro':
            return 'animales/uk_bird.mp3';
          default:
            break;
        }
      } else {
        switch (valor) {
          case 'perro':
            return 'animales/br_perro.mp3';
          case 'gato':
            return 'animales/br_gato.mp3';
          case 'pez':
            return 'animales/br_pez.mp3';
          case 'vaca':
            return 'animales/br_vaca.mp3';
          case 'pajaro':
            return 'animales/br_pajaro.mp3';
          default:
            break;
        }}}

        traducirNumero(valor: string) {
          if (this.idioma === 'español') {
            switch (valor) {
              case '1':
                return 'numeros/esp_uno.mp3';
              case '2':
                return 'numeros/esp_dos.mp3';
              case '3':
                return 'numeros/esp_tres.mp3';
              case '4':
                return 'numeros/esp_cuatro.mp3';
              case '5':
                return 'numeros/esp_cinco.mp3';
              default:
                break;
            }
      
          } else if (this.idioma === 'ingles') {
            switch (valor) {
              case '1':
                return 'numeros/uk_one.mp3';
              case '2':
                return 'numeros/uk_two.mp3';
              case '3':
                return 'numeros/uk_three.mp3';
              case '4':
                return 'numeros/uk_four.mp3';
              case '5':
                return 'numeros/uk_five.mp3';
              default:
                break;
            }
      
          } else {
            switch (valor) {
              case '1':
                return 'numeros/br_uno.mp3';
              case '2':
                return 'numeros/br_dos.mp3';
              case '3':
                return 'numeros/br_tres.mp3';
              case '4':
                return 'numeros/br_cuatro.mp3';
              case '5':
                return 'numeros/br_cinco.mp3';
              default:
                break;
            }}}
      
          
      
        // ESTA FUNCION TRADUCE LOS COLORES. 
        traducirColor(valor: string) 
        {
          if (this.idioma === 'español') {
            switch (valor) {
              case 'rojo':
                return 'colores/esp_rojo.mp3';
              case 'azul':
                return 'colores/esp_azul.mp3';
              case 'amarillo':
                return 'colores/esp_amarillo.mp3';
              case 'verde':
                return 'colores/esp_verde.mp3';
              case 'rosa':
                return 'colores/esp_rosa.mp3';
              default:
                break;
            }
          } else if (this.idioma === 'ingles') {
            switch (valor) {
              case 'rojo':
                return 'colores/uk_red.mp3';
              case 'azul':
                return 'colores/uk_blue.mp3';
              case 'amarillo':
                return 'colores/uk_yellow.mp3';
              case 'verde':
                return 'colores/uk_green.mp3';
              case 'rosa':
                return 'colores/uk_pink.mp3';
              default:
                break;
            }
          } else {
            switch (valor) {
              case 'rojo':
                return 'colores/br_rojo.mp3';
              case 'azul':
                return 'colores/br_azul.mp3';
              case 'amarillo':
                return 'colores/br_amarillo.mp3';
              case 'verde':
                return 'colores/br_verde.mp3';
              case 'rosa':
                return 'colores/br_rosa.mp3';
              default:
                break;
            }
          }
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
