import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-facturas-add',
  templateUrl: 'facturas-add.html',
})
export class FacturasAddPage {

  private userId: string = localStorage.getItem('user');
  private gastos: FirebaseListObservable<any>;
  private globales: FirebaseListObservable<any>;
  private facturas: FirebaseListObservable<any>;

  private gastosArr: any[] = [];
  private globalesArr: any[] = [];
  private facturasArr: any[] = [];

  private facturasId: string[] = [];
  private selectedGasto: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private load: LoadingController,
    private db: AngularFireDatabase
  ) {
    let loader = this.load.create({content: 'Cargando gastos...'});
    loader.present();
    this.gastos = db.list('gastos', {query: {orderByChild: 'user', equalTo: this.userId}});
    this.globales = db.list('gastos-globales', {query: {orderByChild: 'user', equalTo: this.userId}});
    this.facturas = db.list('facturas', {query: {orderByChild: 'user', equalTo: this.userId}});

    this.gastos.subscribe(snap => this.gastosArr = snap);
    this.globales.subscribe(snap => this.globalesArr = snap);
    this.facturas.subscribe(snap => this.facturasId = snap.map(f => f.gasto));

    setTimeout(() => {
      this.gastosArr = this.gastosArr.filter(g => this.facturasId.indexOf(g.$key) < 0);
      this.globalesArr = this.globalesArr.filter(g => this.facturasId.indexOf(g.$key) < 0);
      loader.dismiss();
    }, 1000);
  }

  openFacturaOptions() {
    
  }

}
