import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ActionSheetController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-globales',
  templateUrl: 'globales.html',
})
export class GlobalesPage {

  private gastos: FirebaseListObservable<any>;
  private userId: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private dialog: ModalController,
    private sheet: ActionSheetController
  ) {
    this.afAuth.auth.onAuthStateChanged((user) => {
      this.userId = user.uid;
      this.gastos = this.db.list('/gastos-globales', {
        query: {
          orderByChild: 'user',
          equalTo: user.uid
        }
      });
    });
  }

  openAddGasto() {
    let modal = this.dialog.create('GastoAddPage');
    modal.present();
    modal.onDidDismiss((data) => {
      if(!data) return;
      data.user = this.userId;
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
