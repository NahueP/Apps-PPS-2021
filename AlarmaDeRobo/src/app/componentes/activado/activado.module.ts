import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActivadoPageRoutingModule } from './activado-routing.module';

import { ActivadoPage } from './activado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActivadoPageRoutingModule
  ],
  declarations: [ActivadoPage]
})
export class ActivadoPageModule {}
