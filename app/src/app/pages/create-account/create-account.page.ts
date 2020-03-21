import { Component, OnInit } from '@angular/core';
import {UserDataService} from '../../services/UserDataService';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage implements OnInit {

  datenschutz = false;
  username = '';

  constructor(
      public udService: UserDataService
  ) { }

  ngOnInit() {
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

  }


}
