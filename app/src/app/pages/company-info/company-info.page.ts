import { Component, OnInit } from '@angular/core';
import {CompanyDetails} from "./CompanyDetails";
import {Items} from "./Items";
import set = Reflect.set;
import {connectableObservableDescriptor} from "rxjs/internal/observable/ConnectableObservable";
import {PayPal, PayPalConfiguration, PayPalPayment} from '@ionic-native/paypal/ngx';
import {ActionSheetController} from '@ionic/angular';
import {Router} from "@angular/router";

@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.page.html',
  styleUrls: ['./company-info.page.scss'],
})
export class CompanyInfoPage implements OnInit {

  public total_sum : number = null;
  public total_sum_2_string : string;
  public all_articles : any = [];
  public added_articles : any = [];
  public numOfItems : any = null;

  public companyInformations : CompanyDetails;

  constructor(public actionSheetController: ActionSheetController, private payPal: PayPal, public router: Router) {

    this.total_sum = 0;
    this.total_sum_2_string = "0";
    this.companyInformations = new CompanyDetails();

    this.runInitial();
  }

  ngOnInit() {
  }

  printHelloMessage(txt) {
    console.log(txt);
  }

  addArticles(num, item) {
      let tmp = parseFloat(num);
      this.total_sum += tmp;
      this.total_sum_2_string = this.total_sum.toFixed(2);

      this.added_articles.push(item);
      /*console.log(this.getSpecificItem());*/
  }

  async checkOrder() {
    if(this.added_articles.length < 1) {
      alert("STOP RIGHT THERE CRIMINAL. U HAVE NO ITEMS!")
    } else {
      /*do some stuff here (change to payment popup)*/
      console.log("GOTO Payment Method");
      let tmp_arr = [];
      for(let k =0; k < this.added_articles.length; k++) {
        tmp_arr.push("(" + this.added_articles[k].getItemName() + ", " + this.added_articles[k].getItemValue().toFixed(2) + "€)")
      }
      console.log(tmp_arr);
      const actionSheet = await this.actionSheetController.create({
        header: 'Zahlungsmethode wählen',
        buttons: [{
          text: 'PayPal',
          handler: () => {
            this.payPal.init( {
              PayPalEnvironmentProduction: '',
              PayPalEnvironmentSandbox: 'ATrKos7gH-abX4fJ5CmkrByTvT9bxIYNBdsKNfceJ06_9nKvIvwm8cPPB6dzUBrjknAkFnbxhWLi8vgi'
            }).then(() => {
              this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration( {
                acceptCreditCards: false,
                languageOrLocale: 'de-de',
                merchantName: 'WeLoveLocal',
                merchantPrivacyPolicyURL: '',
                merchantUserAgreementURL: ''
              })).then(() => {
                const payment = new PayPalPayment(this.total_sum_2_string, 'EUR', this.companyInformations.getCompanyName(), 'Sale');
                payment.payeeEmail = 'sb-pksp61235045@personal.example.com';
                this.payPal.renderSinglePaymentUI(payment).then(() => {
                  console.log('Payment successful');
                  this.router.navigateByUrl('/thank-you');
                }, () => {
                  console.log('Render error');
                });
              }, () => {

              });
            }, () => {

            });
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


  runInitial() {
    /* Change Hardcode stuff with server request or similar */

    this.companyInformations.setCompanyID("12345");

    this.companyInformations.setCompanyName("Wild Rice Restaurant");

    this.companyInformations.setCompanyDescription("Wir sind ein lustiges Restaurant mit Essen und Trinken für alle Leute. Seit 30 Jahren im Geschäft und mit über 10 zufriedenen Kunden sind wir auch " +
        "sehr zufrieden.");

    this.companyInformations.setCompanyMainPicture("https://cdn.vox-cdn.com/thumbor/WojLgSa3tzWeE10bA5NF_0lfhYY=/" +
        "0x0:2048x1365/920x613/filters:focal(861x520:1187x846):format(webp)/cdn.vox-cdn.com/uploads/chorus_" +
        "image/image/59488337/20786021_1964885550462647_3189575152413374824_o.0.jpg");

    this.companyInformations.setCompanyLocation('Bahrenfelder Str. 170, 22765 Hamburg');
    this.companyInformations.setCompanyContact('040 3990811, wildrice.hh@gmail.com');
    this.companyInformations.setCompanyItems([
        [0, "Kaffee", "some icon", 1.00],
      [1, "Limo", "some icon", 2.20],
      [2, "Cocktail", "some icon", 3.20],
      [3, "Bier", "some icon", 5.50],
      [4, "Bubble Tea", "some icon", 2.00],
      [5, "Radler", "some icon", 0.20],
      [6, "Stilles Wasser", "some icon", 0.50],
      [7, "Capri-Sun", "some icon", 6.99]
        ]);

    for(let i = 0; i < this.companyInformations.getCompanyItems().length; i++){
      let item = this.companyInformations.getCompanyItems()[i];
      this.all_articles.push(new Items(item[0], item[1], item[2], item[3]));
    }

    this.numOfItems = this.all_articles.length;
  }

}
