import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController, ActionSheetController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-politicas',
  templateUrl: 'politicas.html',
})
export class PoliticasPage {

  private user: Observable<firebase.User>;
  private userId: string;
  private politicas: FirebaseListObservable<any>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private toast: ToastController,
    private dialog: ModalController,
    private sheet: ActionSheetController
  ) {
    this.user = this.afAuth.authState;
    this.user.subscribe((user) => {
      this.userId = user.uid;
      this.politicas = this.db.list('/politicas', {
        query: {
          orderByChild: 'user',
          equalTo: user.uid
        }
      });
    });
  }

  openAddPolitica(id: string) {
    if (!id) {
      return this.toast.create({message: 'Inicia sesión para poder agregar una política...', duration: 4000}).present();
    }
    let modal = this.dialog.create('PoliticasAddPage');
    modal.present();
    modal.onDidDismiss((data) => {
      if(!data) return;
      data.user = id;
      this.politicas.push(data);
    });
  }

  openPolOptions(pol: any) {
    let options = this.sheet.create({
      title: 'Opciones de politica',
      buttons: [
        {
          text: 'Editar politica',
          handler: () => {
            let modal = this.dialog.create('PoliticasEditPage', {pol});
            modal.present();
            modal.onDidDismiss((data) => {
              if(!data) return;
              this.politicas.update(pol.$key, data);
            });
          }
        },
        {
          text: 'Eliminar politica',
          handler: () => {
            this.politicas.remove(pol.$key);
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
