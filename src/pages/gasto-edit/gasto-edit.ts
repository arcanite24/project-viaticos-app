import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-gasto-edit',
  templateUrl: 'gasto-edit.html',
})
export class GastoEditPage {

  private gastoData: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {
    this.gastoData = this.navParams.get('gasto');
  }

  close() {
    this.viewCtrl.dismiss(this.gastoData);
  }

}
