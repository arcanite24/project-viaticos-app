import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import {  } from 'angularfire2';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase';

@Injectable()
export class AuthProvider {

  public cars_api: string = 'https://car-kpl-api.appspot.com/api/v1';
  public upload_path: string = '/uploads';

  uploads: FirebaseListObservable<any[]>;

  constructor(
    public http: Http,
    private db: AngularFireDatabase
  ) {}

  // Cars
  searchCars(query: string) {
    return this.http.get(`${this.cars_api}/car/search?s=${query}`).map(res => res.json());
  }

  // Upload
  upload(file: File, cb: Function) {
    let storageRef = firebase.storage().ref();
    let uploadTask = storageRef.child(`${this.upload_path}/${file.name}`).put(file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, {
      'next': (snapshot) => {
        console.log('====================================');
        console.log(snapshot);
        console.log('====================================');
      },
      'error': (err) => {
        console.log('====================================');
        console.log(err);
        console.log('====================================');
      },
      'complete': () => {
        return cb(uploadTask.snapshot.downloadURL);
      }
    });
    
  }

}
