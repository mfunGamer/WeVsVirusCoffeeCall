import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage implements OnInit {

  datenschutz = false;

  constructor() { }

  ngOnInit() {
  }

  datenschutzChange() {
    console.log("Datenschutz Changed to " + this.datenschutz);
  }

  weiterPressed() {
    console.log("weiterButtonPressed!");
  }


}
