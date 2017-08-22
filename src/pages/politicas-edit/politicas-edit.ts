import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-politicas-edit',
  templateUrl: 'politicas-edit.html',
})
 export class PoliticasEditPage {

  private editData: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController) {
    this.editData = this.navParams.get('pol');
  }

  close() {
    this.viewCtrl.dismiss(this.editData);
  }

}
