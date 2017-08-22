import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-politicas-add',
  templateUrl: 'politicas-add.html',
})
export class PoliticasAddPage {
  
  private addData: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController) {
  }

  close() {
    this.viewCtrl.dismiss(this.addData);
  }

}
