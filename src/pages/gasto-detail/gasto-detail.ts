import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-gasto-detail',
  templateUrl: 'gasto-detail.html',
})
export class GastoDetailPage {

  private gasto: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {
    this.gasto = this.navParams.get('gasto');
  }

}
