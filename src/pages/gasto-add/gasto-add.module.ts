import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GastoAddPage } from './gasto-add';

@NgModule({
  declarations: [
    GastoAddPage,
  ],
  imports: [
    IonicPageModule.forChild(GastoAddPage),
  ],
})
export class GastoAddPageModule {}
