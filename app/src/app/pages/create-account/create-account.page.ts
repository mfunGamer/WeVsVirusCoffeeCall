import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserDataService} from '../../services/UserDataService';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage {

  datenschutz = false;
  username = '';

  constructor(
      public udService: UserDataService,
      private router: Router
  ) { }

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

}
