import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActivadoPage } from './activado.page';

const routes: Routes = [
  {
    path: '',
    component: ActivadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActivadoPageRoutingModule {}
