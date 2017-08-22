import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-modal-select-car',
  templateUrl: 'modal-select-car.html',
})
export class ModalSelectCarPage {

  private allCars: any[] = [];
  private selectedCarIndex: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public view: ViewController) {
    this.allCars = this.navParams.get('cars');
  }

  close(car: any) {
    this.view.dismiss(car);
  }

}
