import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PoliticasEditPage } from './politicas-edit';

@NgModule({
  declarations: [
    PoliticasEditPage,
  ],
  imports: [
    IonicPageModule.forChild(PoliticasEditPage),
  ],
})
export class PoliticasEditPageModule {}
