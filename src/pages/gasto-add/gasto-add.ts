import { AuthProvider } from './../../providers/auth/auth';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-gasto-add',
  templateUrl: 'gasto-add.html',
})
export class GastoAddPage {

  private addData: any = {};
  private selectedCategory: string = 'FOOD';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private auth: AuthProvider,
    private load: LoadingController
  ) {
    this.addData = {};
  }

  close(file) {
    if (file.files.length <= 0) {
      this.addData.category = this.selectedCategory;
      this.viewCtrl.dismiss(this.addData); 
    } else {
      let loader = this.load.create({content: 'Subiendo imágen...'});
      loader.present()
      this.auth.upload(file.files[0], (url) => {
        this.addData.category = this.selectedCategory;
        this.addData.ticket = url;
        this.viewCtrl.dismiss(this.addData); 
        loader.dismiss();
      });
    }
  }

}
