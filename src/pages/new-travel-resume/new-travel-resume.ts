import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-new-travel-resume',
  templateUrl: 'new-travel-resume.html',
})
export class NewTravelResumePage {

  private travelData: any = {prev: {}};
  private travelName: any;

  private viajes: FirebaseListObservable<any>;
  private userId: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private db: AngularFireDatabase,
    private load: LoadingController,
    private toast: ToastController,
    private afAuth: AngularFireAuth
  ) {
    this.afAuth.auth.onAuthStateChanged((user) => {
      this.userId = user.uid;
    });
    this.travelData = {prev: {}};
    this.travelData = this.navParams.get('data');
    this.viajes = db.list('viajes');
  }

  createTravel() {
    if (!this.userId) {
      return this.toast.create({message: 'Error, usuario no especificado, inicia sesión para agregar un viaje.', duration: 4000}).present();
    }
    let data = {
      transport: this.travelData.prev.transport,
      coordsFrom: this.travelData.prev.coordsFrom,
      coordsTo: this.travelData.prev.coordsTo,
      placeFrom: {
        formatted_address: this.travelData.prev.placeFrom.formatted_address,
        name: this.travelData.prev.placeFrom.name,
        id: this.travelData.prev.placeFrom.id,
        place_id: this.travelData.prev.placeFrom.place_id,
        url: this.travelData.prev.placeFrom.url,
        address_components: this.travelData.prev.placeFrom.address_components,
      },
      placeTo: {
        formatted_address: this.travelData.prev.placeTo.formatted_address,
        name: this.travelData.prev.placeTo.name,
        id: this.travelData.prev.placeTo.id,
        place_id: this.travelData.prev.placeTo.place_id,
        url: this.travelData.prev.placeTo.url,
        address_components: this.travelData.prev.placeTo.address_components,
      },
      hotel: this.travelData.hotel,
      name: this.travelName,
      flight: null,
      car: null,
      bus: null,
      user: this.userId
    };
    switch (this.travelData.prev.transport) {
      case 'AVION':
        data.flight = this.travelData.prev.flight;
        delete data.car;
        delete data.bus;
        break;

      case 'AUTO':
        data.car = this.travelData.prev.car;
        delete data.flight;
        delete data.bus;
        break;
    
      default:
        break;
    }

    let loader = this.load.create({content: 'Creando viaje...'});
    loader.present()
    this.viajes.push(data).then(_ => {
      loader.dismiss();
      this.toast.create({message: 'Viaje agregado correctamente. Puedes ver/editar los detalles en la sección de viajes pasados.', duration: 4000}).present();
      this.navCtrl.setRoot('HomePage');
    }).catch((err) => {
      loader.dismiss();
      this.toast.create({message: 'Error, no se pudo crear el viaje.', duration: 4000}).present();
    });
  }

}
