import { Component, OnInit } from '@angular/core';
import { PayPal, PayPalPayment, PayPalConfiguration} from '@ionic-native/paypal/ngx';
import {ActionSheetController} from '@ionic/angular';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {

  constructor(public actionSheetController: ActionSheetController, private payPal: PayPal) { }

  ngOnInit() {
  }

  async test() {
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
              const payment = new PayPalPayment('3.99', 'EUR', 'WeLoveLocal', 'Sale');
              this.payPal.renderSinglePaymentUI(payment).then(() => {
                console.log('Payment successful');
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
