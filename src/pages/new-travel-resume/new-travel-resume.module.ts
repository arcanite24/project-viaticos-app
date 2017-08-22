import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewTravelResumePage } from './new-travel-resume';

@NgModule({
  declarations: [
    NewTravelResumePage,
  ],
  imports: [
    IonicPageModule.forChild(NewTravelResumePage),
  ],
})
export class NewTravelResumePageModule {}
