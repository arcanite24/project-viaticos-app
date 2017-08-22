import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FacturasDetailPage } from './facturas-detail';

@NgModule({
  declarations: [
    FacturasDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(FacturasDetailPage),
  ],
})
export class FacturasDetailPageModule {}
