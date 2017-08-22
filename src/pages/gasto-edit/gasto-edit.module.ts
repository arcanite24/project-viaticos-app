import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GastoEditPage } from './gasto-edit';

@NgModule({
  declarations: [
    GastoEditPage,
  ],
  imports: [
    IonicPageModule.forChild(GastoEditPage),
  ],
})
export class GastoEditPageModule {}
