import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ActionSheetController } from 'ionic-angular';
import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-facturas',
  templateUrl: 'facturas.html',
})
export class FacturasPage {

  private facturas: FirebaseListObservable<any>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private db: AngularFireDatabase,
    private dialog: ModalController,
    private action: ActionSheetController
  ) {
    this.facturas = db.list('/facturas', {query: {orderByChild: 'user', equalTo: localStorage.getItem('user')}});
  }

  openAddFactura() {
    let modal = this.dialog.create('FacturasAddPage');
    modal.present();
    modal.onDidDismiss((data) => {
      if(!data) return;
      data.user = localStorage.getItem('user');
      data.gasto = data.$key;
      data.status = 2;
      data.pedida = moment().format('YYYY/MM/DD');
      this.facturas.push(data);
    });
  }

  openFacturaOptions(factura: any) {
    let sheet = this.action.create({
      title: 'Opciones de factura',
      buttons: [
        {
          text: 'Ver detalles',
          handler: () => {
            let modal = this.dialog.create('FacturasDetailPage', {factura});
            modal.present();
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel'
        }
      ]
    });
    sheet.present();
  }

}
