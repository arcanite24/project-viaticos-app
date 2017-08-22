import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ActionSheetController, ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-travel-detail',
  templateUrl: 'travel-detail.html',
})
export class TravelDetailPage {

  private travel: FirebaseObjectObservable<any>;
  private key: string;

  private gastos: FirebaseListObservable<any>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private db: AngularFireDatabase,
    private dialog: ModalController,
    private sheet: ActionSheetController,
    private toast: ToastController
  ) {
    this.key = this.navParams.get('key');
    this.travel = db.object(`/viajes/${this.key}`);
    this.gastos = db.list('/gastos', {
      query: {
        orderByChild: 'viaje',
        equalTo: this.key
      }
    });
  }

  openAddGasto(key: string) {
    if(!key) return this.toast.create({message: 'Error, viaje no especificado.', duration: 4000}).present();
    let modal = this.dialog.create('GastoAddPage');
    modal.present();
    modal.onDidDismiss((data) => {
      if(!data) return;
      data.user = localStorage.getItem('user');
      data.viaje = key;
      this.gastos.push(data);
    });
  }

  openGastoOptions(gasto: any) {
    let options = this.sheet.create({
      title: 'Opciones de gasto',
      buttons: [
        {
          text: 'Ver detalles',
          handler: () => {
            let modal = this.dialog.create('GastoDetailPage', {gasto});
            modal.present();
          }
        },
        {
          text: 'Editar gasto',
          handler: () => {
            let modal = this.dialog.create('GastoEditPage', {gasto});
            modal.present();
            modal.onDidDismiss((data) => {
              if(!data) return;
              this.gastos.update(gasto.$key, data);
            });
          }
        },
        {
          text: 'Eliminar gasto',
          handler: () => {
            this.gastos.remove(gasto.$key);
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel'
        }
      ]
    });
    options.present();
  }

}
