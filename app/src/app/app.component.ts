import { Component} from '@angular/core';
import { Platform } from '@ionic/angular';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']

})
export class AppComponent {

    navigate : any;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,

  ) {

      this.sideMenu();
    this.initializeApp();

  }

  sideMenu(){
      this.navigate =
          [
              {
                  title : "Home",
                  url   : "home",
                  icon  : "home-outline"
              },
              {
                  title : "Create Account",
                  url   : "create-account",
                  icon  : "key-outline"
              },
              {
                  title : "Settings",
                  url   : "settings",
                  icon  : "settings-outline"
              },
          ]
  }


  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
