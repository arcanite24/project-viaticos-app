import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewTravelDestinationPage } from './new-travel-destination';

@NgModule({
  declarations: [
    NewTravelDestinationPage,
  ],
  imports: [
    IonicPageModule.forChild(NewTravelDestinationPage),
  ],
})
export class NewTravelDestinationPageModule {}
