import {Component, HostListener, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserDataService} from '../../services/UserDataService';
import {IonRouterOutlet, MenuController, ModalController} from '@ionic/angular';
import {DataProtectionModalPage} from "../../modals/data-protection-modal/data-protection-modal.page";
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],

})
export class CreateAccountPage{

    datenschutz = false;
    username = '';
    fileUrl;
    swipeEnabled = false;

  constructor(
      public udService: UserDataService,
      private router: Router,
      private modalController: ModalController,
      public alertController: AlertController,
      private routerOutlet: IonRouterOutlet,
      private menu: MenuController
  ) {
  }

    ionViewDidEnter() {
        this.routerOutlet.swipeGesture = this.swipeEnabled;
        this.menu.swipeGesture( this.swipeEnabled);
        //TODO disable hardware backbutton if !swipeenabled
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
        this.udService.saveUserName(this.username);
        this.swipeEnabled = true;
        this.menu.swipeGesture( true);
        this.router.navigateByUrl('/home');
    }

    async updateImage() {
        const alert = await this.alertController.create({
            header: 'Info',
            message: 'Das Bild kann in dieser Version der App leider noch nicht geändert werden.',
            buttons: ['OK']
        });
        await alert.present();
    }

    async presentAlert() {
        const alert = await this.alertController.create({
            header: 'Info',
            // tslint:disable-next-line:max-line-length
            message: 'Dein Bild und dein Name dienen dazu, dass du nach deiner Spende ein personalisiertes Bild zum Teilen erhalten kannst. <br> <br> Nur die Angabe eines Namens ist verfplichtend.',
            buttons: ['OK']
        });
        await alert.present();
    }

    async openModal() {
        const modal = await this.modalController.create({
            component: DataProtectionModalPage
        });
        return await modal.present();
    }

}
