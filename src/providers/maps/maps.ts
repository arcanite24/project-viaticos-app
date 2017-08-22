import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class MapsProvider {

  public api_key_gmaps: string = 'AIzaSyCqgEpBnskwBzZY1_-LCqgYGbajwy7q1Wg';

  constructor(public http: Http) {}

  getDistance(lat, lng, destLat, destLng) {
    return this.http.get(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${lat},${lng}&destinations=${destLat},${destLng}&key=${this.api_key_gmaps}`).map(res => res.json());
  }

}
