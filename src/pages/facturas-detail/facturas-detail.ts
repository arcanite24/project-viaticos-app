import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-facturas-detail',
  templateUrl: 'facturas-detail.html',
})
export class FacturasDetailPage {

  private fac: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController) {
    this.fac = navParams.get('factura');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FacturasDetailPage');
  }

}
