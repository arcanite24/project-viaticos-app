import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { IonicPage, NavController, ToastController, LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user: Observable<firebase.User>;
  private email: string;
  private password: string;

  private users: FirebaseListObservable<any>;

  constructor(
    public afAuth: AngularFireAuth,
    private toast: ToastController,
    private navCtrl: NavController,
    private load: LoadingController,
    private db: AngularFireDatabase
  ) {
    this.user = afAuth.authState;
    this.users = db.list('/usuarios');
  }

  loginGoogle() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((data) => {
      this.toast.create({message: 'Sesión iniciada correctamente', duration: 4000}).present();
      this.navCtrl.setRoot('HomePage');
    }).catch((err) => {
      this.toast.create({message: err.message, duration: 4000}).present();
    });
  }

  loginFacebook() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then((data) => {

      // Tets si ya existe
      this.users.subscribe((users) => {
        let usersIds = users.map(u => u.uid);
        if(usersIds.indexOf(data.user.uid) < 0) this.users.push({email: data.user.email, uid: data.user.uid});
        localStorage.setItem('user', data.user.uid);
        this.toast.create({message: 'Sesión iniciada correctamente', duration: 4000}).present();
        this.navCtrl.setRoot('HomePage');
      });
    }).catch((err) => {
      this.toast.create({message: err.message, duration: 4000}).present();
    });
  }

  loginEmail() {
    let loader = this.load.create({content: 'Iniciando sesión...'});
    loader.present()
    this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password).then((data) => {
      this.users.subscribe((users) => {
        let usersIds = users.map(u => u.uid);
        if(usersIds.indexOf(data.uid) < 0) this.users.push({email: data.email, uid: data.uid});
        localStorage.setItem('user', data.uid);
        this.toast.create({message: 'Sesión iniciada correctamente', duration: 4000}).present();
        this.navCtrl.setRoot('HomePage');
        loader.dismiss();
      });
    }).catch((err) => {
      this.toast.create({message: err.message, duration: 4000}).present();
      loader.dismiss();
    });
  }

  openRegister() {
    this.navCtrl.push('RegisterPage');
  }

}
