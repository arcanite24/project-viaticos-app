import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalSelectCarPage } from './modal-select-car';

@NgModule({
  declarations: [
    ModalSelectCarPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalSelectCarPage),
  ],
})
export class ModalSelectCarPageModule {}
