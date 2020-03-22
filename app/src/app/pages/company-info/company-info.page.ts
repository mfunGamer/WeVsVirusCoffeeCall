import { Component, OnInit } from '@angular/core';
import {CompanyDetails} from "./CompanyDetails";
import {Items} from "./Items";
import set = Reflect.set;
import {connectableObservableDescriptor} from "rxjs/internal/observable/ConnectableObservable";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {NavController} from "@ionic/angular";
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";

import {PayPal, PayPalConfiguration, PayPalPayment} from '@ionic-native/paypal/ngx';
import {ActionSheetController} from '@ionic/angular';

@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.page.html',
  styleUrls: ['./company-info.page.scss'],
})
export class CompanyInfoPage implements OnInit {

  public infoTags = ["id", "name", "email", "description", "reason", "img_url", "paypal", "thank_you_msg",
    "owner", "company_type", "lat", "lon", "items"];

  public info = null;

  public infoMessage = "Hinweis: Der Einkauf untenstehender Waren erfolgt virtuell. " +
      "Jeder Betrag ihres Einkaufs wird an ihr augewähltes Lokal gespendet. " +
      "Sie unterstzützen damit, ihr Restaurant in der aktuellen Situatuiion :)";

  public total_sum: number = null;
  public total_sum_2_string: string;
  public all_articles: any = [];
  public added_articles: any = [];
  public numOfItems: any = null;

  public companyData: any;

  public companyInformations: CompanyDetails;

  constructor(private route: ActivatedRoute, public actionSheetController: ActionSheetController,
              private payPal: PayPal,public router: Router) {

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.companyData = this.router.getCurrentNavigation().extras.state;

        /* console.log("in constructor: " + this.companyData); */

        this.someFunction(this.companyData);

      } else {
        console.log("something went wrong")
      }
    });

    /*
    this.test = this.httpClient.get('137.74.140.50:3000');
    this.test.subscribe(data => {console.log('data: ', data)});
    */

    this.total_sum = 0;
    this.total_sum_2_string = "0";
    this.companyInformations = null;

    /* this.runInitial(); */
  }

  ngOnInit() {

  }

  printHelloMessage() {
    console.log("Hello");
  }

  addArticles(num, item) {
    let tmp = parseFloat(num);
    this.total_sum += tmp;
    this.total_sum_2_string = this.total_sum.toFixed(2);

    this.added_articles.push(item);
    /*console.log(this.getSpecificItem());*/
  }

  async checkOrder() {
    if (this.added_articles.length < 1) {
      console.log("Error not enough items.");
    } else {
      /*do some stuff here (change to payment popup)*/
      console.log("GOTO Payment Method");
      let tmp_arr = [];
      for (let k = 0; k < this.added_articles.length; k++) {
        tmp_arr.push("(" + this.added_articles[k].getItemName() + ", " + this.added_articles[k].getItemValue().toFixed(2) + "€)")
      }
      console.log(tmp_arr);
      const actionSheet = await this.actionSheetController.create({
        header: 'Zahlungsmethode wählen',
        buttons: [{
          text: 'PayPal',
          handler: () => {
            this.payPal.init({
              PayPalEnvironmentProduction: '',
              PayPalEnvironmentSandbox: 'ATrKos7gH-abX4fJ5CmkrByTvT9bxIYNBdsKNfceJ06_9nKvIvwm8cPPB6dzUBrjknAkFnbxhWLi8vgi'
            }).then(() => {
              this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
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
                }, () => {
                  console.log('Render error');
                });
              }, () => {

              });
            }, () => {

            });
            const navigationExtras: NavigationExtras = {state: {
                    name: this.companyInformations.getCompanyName(),
                    tyMsg: this.companyInformations.getCompanyTyMsg(),
                    image: this.companyInformations.getCompanyMainPicture(),
                    amount: this.total_sum_2_string

                }}
            this.router.navigateByUrl('/thank-you', navigationExtras);
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


  itemList(someItems) {
    let gg = [];
    for (const kar in someItems) {
      const item: string = someItems[kar];
      gg.push(item);

    }

    return gg;

  }


  someFunction(inside) {
      let tmp = [];
      let tmp2 = [];

      for (const key in inside) {
        const item: string = inside[key];

        console.log(item);

        for (let i = 0; i < this.infoTags.length; i++) {

          if (this.infoTags[i] == "items") {

            if (item["items"] == undefined) {
              tmp.push([["Kein Produkt", "http://www.etikettenwissen.de/images/b/b4/P001_Verbotszeichen_ISO7010.png", "0", 123],

                  ["Kaffee","https://www.gesundheit.de/sites/default/files/styles/crop_content/public/2004-08/kaffee-wirkt.jpg?itok=oFFU4Uiz", "2.1", 2, 10],
                  ["Radler","https://cdn02.plentymarkets.com/q7p0kwea05gv/item/images/3678/full/20109-1.png", "200", 3, 10],
                  ["Fanta","https://images-na.ssl-images-amazon.com/images/I/71y12uT-UuL._SL1500_.jpg", "5.3", 4, 10],
                  ["Sprite","https://images-na.ssl-images-amazon.com/images/I/31de1HhT7qL.jpg", "1.7", 5, 10],
                  ["Cola","https://staude-getraenke.de/wp-content/uploads/2018/02/coca-cola-02-30900-2.jpg", "1.7", 6, 10],
                  ["Wasser","https://images.eatsmarter.de/sites/default/files/styles/576x432/public/wasser-wissen.jpg", "1", 7, 10],
                  ["Mehr Wasser","https://images.eatsmarter.de/sites/default/files/styles/576x432/public/wasser-wissen.jpg", "0.5", 8, 10],
                  ["Milch","https://images.eatsmarter.de/sites/default/files/styles/576x432/public/images/milch-gut-fuer-knochen-341x256.jpg", "2.5", 9, 10],
                  ["Orangensaft","https://www.ndr.de/fernsehen/sendungen/markt/saft146_v-contentgross.jpg", "19", 10, 10]
              ]);

            } else {
              /* change here how to parse items of retaurant */
              tmp.push([this.itemList(item[this.infoTags[i]]),

                /* funny stuff here */

                ["Kaffee","https://www.gesundheit.de/sites/default/files/styles/crop_content/public/2004-08/kaffee-wirkt.jpg?itok=oFFU4Uiz", "2.1", 2, 10],
                ["Radler","https://cdn02.plentymarkets.com/q7p0kwea05gv/item/images/3678/full/20109-1.png", "200", 3, 10],
                ["Fanta","https://images-na.ssl-images-amazon.com/images/I/71y12uT-UuL._SL1500_.jpg", "5.3", 4, 10],
                ["Sprite","https://images-na.ssl-images-amazon.com/images/I/31de1HhT7qL.jpg", "1.7", 5, 10],
                ["Cola","https://staude-getraenke.de/wp-content/uploads/2018/02/coca-cola-02-30900-2.jpg", "1.7", 6, 10],
                ["Wasser","https://images.eatsmarter.de/sites/default/files/styles/576x432/public/wasser-wissen.jpg", "1", 7, 10],
                ["Mehr Wasser","https://images.eatsmarter.de/sites/default/files/styles/576x432/public/wasser-wissen.jpg", "0.5", 8, 10],
                ["Milch","https://images.eatsmarter.de/sites/default/files/styles/576x432/public/images/milch-gut-fuer-knochen-341x256.jpg", "2.5", 9, 10],
                ["Orangensaft","https://www.ndr.de/fernsehen/sendungen/markt/saft146_v-contentgross.jpg", "19", 10, 10]

              ]);

            }
          } else {
            tmp.push(item[this.infoTags[i]]);
          }
        }
      }

      tmp2 = tmp[tmp.length-1];

      console.log(tmp);

      this.companyInformations = new CompanyDetails(tmp);

      this.companyInformations.setCompanyLocation('Irgendeine Str. 0, 12345 WunderOrt');

      this.companyInformations.setCompanyItems(tmp2);

      /*
      this.companyInformations.setCompanyItems([
        [0, "Kaffee", "some icon", 1.00],
        [1, "Limo", "some icon", 2.20],
        [2, "Cocktail", "some icon", 3.20],
        [3, "Bier", "some icon", 5.50],
        [4, "Bubble Tea", "some icon", 2.00],
        [5, "Radler", "some icon", 200.00],
        [6, "Stilles Wasser", "some icon", 0.50],
        [7, "Capri-Sun", "some icon", 6.99]
      ]);
      */

      for (let i = 0; i < this.companyInformations.getCompanyItems().length; i++) {
        let item = this.companyInformations.getCompanyItems()[i];
        this.all_articles.push(new Items(item[3], item[0], item[1], parseFloat(item[2]), item[4]));
      }
  }
}
