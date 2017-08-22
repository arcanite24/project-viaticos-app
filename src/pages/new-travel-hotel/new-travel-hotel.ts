import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-new-travel-hotel',
  templateUrl: 'new-travel-hotel.html',
})
export class NewTravelHotelPage {

  private prevInfo: any;

  private hotelPrice: number;
  private hotelInfo: string;
  private habsMenores: number = 0;
  private habsAdultos: number = 1;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.prevInfo = this.navParams.get('prev');
  }

  next(hotelRequired: boolean) {
    if(!hotelRequired) {
      this.navCtrl.push('NewTravelResumePage', {data: {prev: this.prevInfo, hotel: false}});
    } else {
      this.navCtrl.push('NewTravelResumePage', {
        data: {
          prev: this.prevInfo,
          hotel: {
            price: this.hotelPrice,
            habsMenores: this.habsMenores,
            habsAdultos: this.habsAdultos,
            info: this.hotelInfo
          }
        }
      });
    }
  }

  changeHabs(isAdultos: boolean, change: number) {
    if (isAdultos) {
      if(change == -1) {
        if (this.habsAdultos > 0) this.habsAdultos--;
      } else {
        this.habsAdultos++;
      }
    } else {
      if(change == -1) {
        if (this.habsMenores > 0) this.habsMenores--;
      } else {
        this.habsMenores++;
      }
    }
  }

}
