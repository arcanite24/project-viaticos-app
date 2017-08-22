import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TravelsPage } from './travels';

@NgModule({
  declarations: [
    TravelsPage,
  ],
  imports: [
    IonicPageModule.forChild(TravelsPage),
  ],
})
export class TravelsPageModule {}
