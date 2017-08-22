import { MapsProvider } from './../../providers/maps/maps';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AuthProvider } from './../../providers/auth/auth';
import { ElementRef, NgZone, OnInit, ViewChild, Component } from '@angular/core';
import { FormControl } from "@angular/forms";
import { IonicPage, NavController, NavParams, ToastController, LoadingController, ModalController } from 'ionic-angular';
import { MapsAPILoader } from "@agm/core";

@IonicPage()
@Component({
  selector: 'page-new-travel-destination',
  templateUrl: 'new-travel-destination.html',
})
export class NewTravelDestinationPage implements OnInit {
  
  private searchCar: string = '';
  private selectedCar: any;
  private carDistance: any;
  private gasPrice: number = 17.83;
  private gasEstimate: number;

  private flightPrice: number;
  private flightDetails: string;

  private placeFrom: any;
  private placeTo: any;

  private latitude: number;
  private longitude: number;
  private latitudeFrom: number;
  private longitudeFrom: number;
  private searchControl: FormControl;
  private searchControlFrom: FormControl;
  private zoom: number;

  private transport: string = 'AVION';

  @ViewChild("search")
  public searchElementRef: ElementRef;

  @ViewChild("searchFrom")
  public searchFromElementRef: ElementRef;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private mapsLoader: MapsAPILoader,
    private ngZone: NgZone,
    private auth: AuthProvider,
    private toast: ToastController,
    private load: LoadingController,
    private dialog: ModalController,
    private iab: InAppBrowser,
    private maps: MapsProvider
  ) {
  }

  selectTransport(transport: string) {
    this.transport = transport;
  }

  ngOnInit() {
    /*
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;
    */

    //create search FormControl
    this.searchControl = new FormControl();
    this.searchControlFrom = new FormControl();
    //load Places Autocomplete
    this.mapsLoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          this.placeFrom = place;

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });

      // Autocomplete from
      let autocompleteFrom = new google.maps.places.Autocomplete(this.searchFromElementRef.nativeElement, {
        types: ["address"]
      });
      autocompleteFrom.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocompleteFrom.getPlace();
          this.placeTo = place;
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.latitudeFrom = place.geometry.location.lat();
          this.longitudeFrom = place.geometry.location.lng();
        });
      });

    });
  }

  searchCarKpl(query: string) {
    if (!query) return;
    if(query.length <= 0) return;
    let loader = this.load.create({content: 'Buscando autos...'});
    loader.present()
    this.auth.searchCars(query).subscribe(
      data => {
        loader.dismiss();
        if(data.length <= 0) return this.toast.create({message: 'Modelos no encontrados...', duration: 4000}).present();
        let modal = this.dialog.create('ModalSelectCarPage', {cars: data});
        modal.present();
        modal.onDidDismiss((car) => {
          if(!car) return;
          this.selectedCar = car;
          let loader = this.load.create({content: 'Calculando distancia y consumo...'});
          loader.present()
          this.maps.getDistance(this.latitude, this.longitude, this.latitudeFrom, this.longitudeFrom).subscribe(
            (data) => {
              this.carDistance = data.rows[0].elements[0];
              this.gasEstimate = ((this.carDistance.distance.value / 1000) / this.selectedCar.mpg) * this.gasPrice;
              loader.dismiss();
            }, (err) => {
              this.toast.create({message: 'Error, no se pudo calcular la distancia en coche entre los 2 puntos. Selecciona un auto de nuevo.', duration: 4000}).present();
              loader.dismiss();
            }
          );
        });
      },
      err => {
        loader.dismiss();
        this.toast.create({message: 'Error, no se pudieron cargar los autos.', duration: 4000}).present();
      }
    );
  }

  openGoogleFlights() {
    let tab = this.iab.create('https://www.google.com.mx/flights');
  }

  next(transport: string) {
    switch (transport) {
        
      case 'AVION':
      this.navCtrl.push('NewTravelHotelPage', {
        prev: {
          transport: transport,
          placeTo: this.placeTo,
          placeFrom: this.placeFrom,
          coordsFrom: {
            lat: this.latitudeFrom,
            lng: this.longitudeFrom
          },
          coordsTo: {
            lat: this.latitude,
            lng: this.longitude
          },
          flight: {
            price: this.flightPrice,
            details: this.flightDetails
          }
        }
      });
        break;

      case 'AUTO':
      this.navCtrl.push('NewTravelHotelPage', {
        prev: {
          transport: transport,
          placeTo: this.placeTo,
          placeFrom: this.placeFrom,
          coordsFrom: {
            lat: this.latitudeFrom,
            lng: this.longitudeFrom
          },
          coordsTo: {
            lat: this.latitude,
            lng: this.longitude
          },
          car: {
            gas: this.gasPrice,
            estimate: this.gasEstimate,
            distance: this.carDistance,
            car: this.selectedCar
          }
        }
      });
        break;

      case 'BUS':

        break;
    
      default:
        this.toast.create({message: 'Error, selecciona un medio de transporte válido.', duration: 4000}).present();
        break;
    }
  }

}
