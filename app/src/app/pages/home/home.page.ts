import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { Map, tileLayer, marker, icon } from 'leaflet';
import { map } from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public http: HttpClient,
              public plt: Platform,
              public router: Router) {

  }


  // tslint:disable-next-line:use-lifecycle-interface
  ngAfterViewInit() {
    this.initMap();
    this.plt.ready().then(() => {
      this.http.get('https://oghuxxw1e6.execute-api.us-east-1.amazonaws.com/dev')
          .pipe(map(res => res))
          .subscribe(restaurants => console.log(restaurants));
    });
  }

  initMap() {

    // tslint:disable-next-line:no-shadowed-variable
    const map = new Map('map').setView([33.6396965, -84.4304574], 23);

    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const customMarkerIcon = icon({
      iconUrl: 'assets/images/dish_02.png',
      iconSize: [64, 64],
      popupAnchor: [0, -20]
    });

    const restaurants = [{id: 3, lat: 33.6396965, lng: -84.4304574}];

    restaurants.forEach((restaurant) => {
      marker([restaurant.lat, restaurant.lng], {icon: customMarkerIcon})
          .bindPopup(`<b>${restaurant.id}</b>`, { autoClose: false })
          .on('click', () => this.router.navigateByUrl('/restaurant'))
          .addTo(map).openPopup();
    });

    setTimeout(() => { map.invalidateSize(); }, 500);
  }

}
