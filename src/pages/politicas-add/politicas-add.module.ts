import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PoliticasAddPage } from './politicas-add';

@NgModule({
  declarations: [
    PoliticasAddPage,
  ],
  imports: [
    IonicPageModule.forChild(PoliticasAddPage),
  ],
})
export class PoliticasAddPageModule {}
