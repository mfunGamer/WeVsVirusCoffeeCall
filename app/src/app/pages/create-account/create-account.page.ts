import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage implements OnInit {

  datenschutz = false;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  datenschutzChange() {
    console.log("Datenschutz Changed to " + this.datenschutz);
  }

  weiterPressed() {
    console.log("weiterButtonPressed!");
    this.router.navigateByUrl('/home');
  }


}
