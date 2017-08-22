import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  // TODO: Agregar estadisticas e información en el perfil

  private user: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AngularFireAuth,
    private toast: ToastController,
    private load: LoadingController
  ) {
    this.auth.authState.subscribe((user) => {
      if(!user) {
        this.toast.create({message: 'Inicia sesión para ingresar a tu perfil.', duration: 4000}).present();
        this.auth.auth.signOut();
        this.navCtrl.setRoot('LoginPage');
      } else {
        this.user = user;
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  logout() {
    let loader = this.load.create({content: 'Cerrando sesión...'});
    loader.present()
    this.auth.auth.signOut().then(() => {
      this.toast.create({message: 'Sesión cerrada correctamente.', duration: 4000}).present();
      this.navCtrl.setRoot('LoginPage');
      loader.dismiss();
      this.user = null;
    }).catch((err) => {
      this.toast.create({message: err.message, duration: 4000}).present();
      loader.dismiss();
    });
  }

}
