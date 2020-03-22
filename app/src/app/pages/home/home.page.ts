import { Component } from '@angular/core';
import {MenuController, Platform} from '@ionic/angular';
import {NavigationExtras, Router} from '@angular/router';
import { Map, tileLayer, marker, icon } from 'leaflet';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import { AlertController } from '@ionic/angular';

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
              private menu: MenuController,
              public alertController: AlertController
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

  async onOpenInfo() {
    const alert = await this.alertController.create({
      header: 'WeLLcome!',
      message:'<img alt="Bäcker" src="assets/images/Marker_Baecker_64x64.png">'         +'Bäcker&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +'<br>'+
              '<img alt="Bar" src="assets/images/Marker_Bar_64x64.png">'                +'Bars&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +'<br>'+
              '<img alt="Caffee" src="assets/images/Marker_Caffee_64x64.png">'          +'Cafés&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +'<br>'+
              '<img alt="Restaurant" src="assets/images/Marker_Restaurant_64x64.png">'  +'Restaurants' +'<br>'+
          '<br><br>'+
          'Mit dieser App unterstützt du deine Lieblingsläden in der Nähe und kannst Freunde online zu einem Lokalbesuch einladen.<br>' +
          'Wir erheben keine Gebühren, sodass dein Beitrag vollständig bei den Ladenbesitzern ankommt (ggfs. abzüglich PayPal Gebühren).',
      buttons: ['Finde ich super!'],
      cssClass: 'alerts'
    });
    await alert.present();
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
        iconSize: [80, 80],
        iconAnchor: [0, +80],
        popupAnchor: [+40, -70]
      });

      const baeckerMarker = icon({
        iconUrl: 'assets/images/Marker_Baecker.png',
        iconSize: [80, 80],
        iconAnchor: [0, +80],
        popupAnchor: [+40, -70]
      });

      const barMarker = icon({
        iconUrl: 'assets/images/Marker_Bar.png',
        iconSize: [80, 80],
        iconAnchor: [0, +80],
        popupAnchor: [+40, -70]
      });

      const caffeeMarker = icon({
        iconUrl: 'assets/images/Marker_Caffee.png',
        iconSize: [80, 80],
        iconAnchor: [0, +80],
        popupAnchor: [+40, -70]
      });

      let headers = new HttpHeaders();
      headers = headers.set('Access-Control-Allow-Origin' , 'http://137.74.140.50:3000');
      headers = headers.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');

      let params = new HttpParams();
      params = params.set('lat', String(result.coords.latitude));
      params = params.set('lon', String(result.coords.longitude));
      params = params.set('radius', '300000');

      this.http.get('http://137.74.140.50:3000/companylist', {headers, params}).subscribe(items => {
        // tslint:disable-next-line:forin
        for (const key in items) {

          const item: string = items[key];

          console.log(item);

          let markerVar;

          // tslint:disable-next-line:triple-equals
          if ((item as any).company_type == 1) {
            markerVar = marker([(item as any).lat, (item as any).lon], {icon: restMarker});
            // tslint:disable-next-line:triple-equals
          } else if ((item as any).company_type == 2) {
            markerVar = marker([(item as any).lat, (item as any).lon], {icon: baeckerMarker});
            // tslint:disable-next-line:triple-equals
          } else if ((item as any).company_type == 3) {
            markerVar = marker([(item as any).lat, (item as any).lon], {icon: barMarker});
          } else {
            markerVar = marker([(item as any).lat, (item as any).lon], {icon: caffeeMarker});
          }

          const navigationExtras: NavigationExtras = {state: {
              company: item
            }};

          markerVar
              .on('click', () => this.router.navigateByUrl('/company-info', navigationExtras))
              .addTo(mapConst);

          //bindPopup(`<b>${(item as any).name}</b>`, {autoClose: false})

        }

        setTimeout(() => { mapConst.invalidateSize(); } , 500);

      });

    }).catch((errorMessage) => {
      console.log('An Error occured', errorMessage);
    });
  }

}
