import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SocialSharing} from '@ionic-native/social-sharing/ngx';
import {ActionSheetController} from "@ionic/angular";
import {UserDataService} from "../../services/UserDataService";
import {File} from '@ionic-native/file/ngx';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.page.html',
  styleUrls: ['./thank-you.page.scss'],
})
export class ThankYouPage implements OnInit {

  public companyData: any;
  public companyName: string;
  public companyTy: string;
  public companyImage: string;
  public amount: string;

  constructor(private route: ActivatedRoute, public router: Router,
              private socialSharing: SocialSharing, public actionSheetController: ActionSheetController,
              private userdDataService: UserDataService, private file: File) {

      this.route.queryParams.subscribe(params => {
          if (this.router.getCurrentNavigation().extras.state) {
              this.companyData = this.router.getCurrentNavigation().extras.state;

              /* console.log("in constructor: " + this.companyData); */


              let count = 0;

              for (const key in this.companyData) {
                  const item: string = this.companyData[key];

                  console.log(item)

                  if (count == 0) {
                    this.companyName = item;
                  } else if (count == 1) {
                    this.companyTy = item;
                  } else if (count == 2){
                    this.companyImage = item;
                  } else {
                    this.amount = item;
                  }
                  count++;

              }



          } else {
              console.log("something went wrong")
          }
      });
  }

  ngOnInit() {

  }

  /*async resolveLocalFile() {
      return this.file.copyFile('${this.file.applicationDirectory}www/assets/images',
          'WeLL_BlackTypo_keinText.png', this.file.cacheDirectory, '${new Date().getTime()}.png')
  }

  removeTempFile(name) {
      this.file.removeFile(this.file.cacheDirectory, name);
  }*/

  async share() {
      //let messageFile = await this.resolveLocalFile();
      /*var messageString: '';
      await this.userdDataService.getUserName().then((value) => {
          console.log(value);
          messageString + value + 'hat über WeLoveLocal für' + this.amount + '€ einen Kaffee bei ' + this.companyName + 'getrunken.';
      }).catch(() =>{

      });*/
      const actionSheet = await this.actionSheetController.create({
          buttons: [{
              text: 'WhatsApp',
              icon: 'logo-whatsapp',
              handler: () => {
                this.socialSharing.shareViaWhatsApp('Ich habe über WeLoveLocal für ' + this.amount + '€ einen Kaffee bei ' + this.companyName + ' getrunken.').then(() => {

                }).catch(e => {

                })
              }
           }, {
              text: 'Twitter',
              icon: 'logo-twitter',
              handler: () => {
                  this.socialSharing.shareViaTwitter('Ich habe über WeLoveLocal für ' + this.amount + '€ einen Kaffee bei ' + this.companyName + ' getrunken.').then(() => {

                  }).catch(e => {

                  })
              }
          }, {
              text: 'Abbrechen',
              icon: 'close',
              role: 'cancel',
              handler: () => {
                  console.log('Cancel clicked');
              }
          }]
      });
      await actionSheet.present();
  }

}
