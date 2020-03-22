import { Component } from '@angular/core';
import {MenuController, Platform} from '@ionic/angular';
import {NavigationExtras, Router} from '@angular/router';
import { Map, tileLayer, marker, icon } from 'leaflet';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Geolocation} from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public http: HttpClient,
              public plt: Platform,
              public router: Router,
              public geolocation: Geolocation,
              private menu: MenuController
              ) {
  }

  ionViewDidEnter() {
    this.menu.swipeGesture(false);
    this.menu.close();

    // tslint:disable-next-line:max-line-length
    // this.http.get('http://137.74.140.50:3000/items', {headers}).forEach(item => console.log(item));

    this.initMap();

  }

  ionViewWillLeave() {
    this.menu.swipeGesture(true);
  }

  onClick() {
    this.menu.open();
  }

  initMap() {

    this.geolocation.getCurrentPosition().then((result) => {

      console.log('lat: ' + result.coords.latitude + ', lng: ' + result.coords.longitude);

      const mapConst = new Map('map').setView([result.coords.latitude, result.coords.longitude], 23);

      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapConst);

      const restMarker = icon({
        iconUrl: 'assets/images/Marker_Restaurant.png',
        iconSize: [60, 80],
        iconAnchor: [0, +80],
        popupAnchor: [+30, -70]
      });

      const baeckerMarker = icon({
        iconUrl: 'assets/images/Marker_Baecker.png',
        iconSize: [60, 80],
        iconAnchor: [0, +80],
        popupAnchor: [+30, -70]
      });

      const barMarker = icon({
        iconUrl: 'assets/images/Marker_Bar.png',
        iconSize: [60, 80],
        iconAnchor: [0, +80],
        popupAnchor: [+30, -70]
      });

      const caffeeMarker = icon({
        iconUrl: 'assets/images/Marker_Caffee.png',
        iconSize: [60, 80],
        iconAnchor: [0, +80],
        popupAnchor: [+30, -70]
      });

      let headers = new HttpHeaders();
      headers = headers.set('Access-Control-Allow-Origin' , 'http://137.74.140.50:3000');
      headers = headers.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');

      let params = new HttpParams();
      params = params.set('lat', String(result.coords.latitude));
      params = params.set('lon', String(result.coords.longitude));
      params = params.set('radius', '30000');

      this.http.get('http://137.74.140.50:3000/companylist', {headers, params}).subscribe(items => {
        for(const key in items) {

          const item: string = items[key];

          console.log(item);

          let markerVar;

          if ((item as any).company_type == 1) {
            markerVar = marker([(item as any).lat, (item as any).lon], {icon: restMarker});
          } else if ((item as any).company_type == 2) {
            markerVar = marker([(item as any).lat, (item as any).lon], {icon: baeckerMarker});
          } else if ((item as any).company_type == 3) {
            markerVar = marker([(item as any).lat, (item as any).lon], {icon: barMarker});
          } else {
            markerVar = marker([(item as any).lat, (item as any).lon], {icon: caffeeMarker});
          }

          const navigationExtras: NavigationExtras = {state: {
              company: item
            }};

          markerVar.bindPopup(`<b>${(item as any).name}</b>`, {autoClose: false})
              .on('click', () => this.router.navigateByUrl('/company-info', navigationExtras))
              .addTo(mapConst);

        }

      });

      setTimeout(() => { mapConst.invalidateSize(); } , 500);

    }).catch((errorMessage) => {
      console.log('An Error occured', errorMessage);
    });
  }

}
