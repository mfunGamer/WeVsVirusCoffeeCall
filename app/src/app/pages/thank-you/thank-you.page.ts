import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SocialSharing} from '@ionic-native/social-sharing/ngx';
import {ActionSheetController} from "@ionic/angular";

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

  constructor(private route: ActivatedRoute, public router: Router, private socialSharing: SocialSharing, public actionSheetController: ActionSheetController) {
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

  async share() {
      const actionSheet = await this.actionSheetController.create({
          buttons: [{
              text: 'WhatsApp',
              icon: 'logo-whatsapp',
              handler: () => {

              }
           },{
              text: 'Instgram',
              icon: 'logo-instagram',
              handler: () => {
                  console.log('Cancel clicked');
              }
          }, {
              text: 'Twitter',
              icon: 'logo-twitter',
              handler: () => {
                  console.log('Cancel clicked');
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
