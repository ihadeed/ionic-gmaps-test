import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  Marker,
  GoogleMapsAnimation,
  MyLocation
} from '@ionic-native/google-maps/ngx';

import {SecondPage} from "../second/second";

const CAMERA_DEFAULT_LAT = 47.497912;
const CAMERA_DEFAULT_LONG = 19.040235;
const CAMERA_DEFAULT_ZOOMLEVEL = 13;


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements AfterViewInit {

  mapReady: boolean = false;
  map: GoogleMap;


  constructor(private navCtrl: NavController,
              private platform: Platform) {}

  async ngAfterViewInit() {
    await this.platform.ready();
    this.loadMap();
  }

  loadMap() {
    console.log('HomePage: loadMap()');
    this.map = GoogleMaps.create('map_canvas', {
      'mapType': 'MAP_TYPE_NORMAL',
      'controls': {
        'compass': true,
        'myLocationButton': true,
        'indoorPicker': false,
        'zoom': true
      },
      'gestures': {
        'scroll': true,
        'tilt': false,
        'rotate': true,
        'zoom': true
      },
      'camera': {
        target: {
          lat: CAMERA_DEFAULT_LAT,
          lng: CAMERA_DEFAULT_LONG
        },
        zoom: CAMERA_DEFAULT_ZOOMLEVEL
      },
      'preferences': {
        'zoom': {
          'minZoom': 10,
          'maxZoom': 18
        },
        'building': false
      }
    });

    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      this.mapReady = true;
      console.log('HomePage: map is ready...');
    });

  }

  ionViewWillLeave() {
    console.log('HomePage: ionViewWillLeave()');
    this.map.setDiv(null);
  }

  ionViewDidEnter() {
    console.log('HomePage: ionViewDidEnter()');
    if (this.map) {
      this.map.setDiv('map_canvas');
    }
  }

  openSecondPage() {
    this.navCtrl.push(SecondPage);
  }

}
