import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserDataService} from '../../services/UserDataService';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],

})
export class CreateAccountPage {

  datenschutz = false;
  username = '';

  fileUrl;

  constructor(
      public udService: UserDataService,
      private router: Router,
      public alertController: AlertController,
  ) {
  }

  isButtonEnabled() {
    // tslint:disable-next-line:triple-equals
    return (!this.datenschutz || this.username.length == 0);
  }

  datenschutzChange() {
    console.log('Datenschutz Changed to ' + this.datenschutz);
  }

  weiterPressed() {
    console.log('weiterButtonPressed!');
    this.router.navigateByUrl('/home');

    this.udService.saveUserName(this.username);

  }

  updateImage() {
    // ToDo open photo library select 1 photo and save returned uri in 'fileUrl'
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Info',
      message: 'Dein Bild und dein Name dienen dazu, dass du nach deiner Spende ein personalisiertes Bild zum Teilen erhalten kannst. <br> <br> Nur die Angabe eines Namens ist verfplichtend.',
      buttons: ['OK']
    });
    await alert.present();
  }
}

