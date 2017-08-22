import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  private registerData: any = {};
  private users: FirebaseListObservable<any>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afAuth: AngularFireAuth,
    private toast: ToastController,
    private load: LoadingController,
    private db: AngularFireDatabase
  ) {
    this.users = db.list('/usuarios');
  }

  register() {
    if (this.registerData.password != this.registerData.repassword) {
      return this.toast.create({message: 'Las contraseñas no coinciden.', duration: 4000}).present();
    }
    if (!this.registerData.email) {
      return this.toast.create({message: 'Ingresa un correo electrónico.', duration: 4000}).present();
    }
    let loader = this.load.create({content: 'Creando usuario...'});
    loader.present()
    this.afAuth.auth.createUserWithEmailAndPassword(this.registerData.email, this.registerData.password).then((data) => {
      this.toast.create({message: 'Cuenta creada correctamente.', duration: 4000}).present();
      this.users.push({
        email: this.registerData.email,
        uid: data.uid
      });
      this.navCtrl.setRoot('HomePage');
      loader.dismiss();
    }).catch((err) => {
      loader.dismiss();
      this.toast.create({message: err.message, duration: 4000}).present();
    });
  }

}
