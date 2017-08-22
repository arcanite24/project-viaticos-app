import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FacturasAddPage } from './facturas-add';

@NgModule({
  declarations: [
    FacturasAddPage,
  ],
  imports: [
    IonicPageModule.forChild(FacturasAddPage),
  ],
})
export class FacturasAddPageModule {}
