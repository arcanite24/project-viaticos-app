import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-travels',
  templateUrl: 'travels.html',
})
export class TravelsPage {

  private travels: FirebaseListObservable<any>;
  private userId: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth
  ) {
    this.afAuth.auth.onAuthStateChanged((user) => {
      this.userId = user.uid;
      this.travels = this.db.list('/viajes', {
        query: {
          orderByChild: 'user',
          equalTo: user.uid
        }
      });
    });
  }

  openTravel(key: string) {
    this.navCtrl.push('TravelDetailPage', {key});
  }

}
