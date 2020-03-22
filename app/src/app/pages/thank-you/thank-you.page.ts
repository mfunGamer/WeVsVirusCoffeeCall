import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CompanyDetails} from "../company-info/CompanyDetails";

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.page.html',
  styleUrls: ['./thank-you.page.scss'],
})
export class ThankYouPage implements OnInit {

  public companyInformations: CompanyDetails;
  public companyData: any;

    public infoTags = ["id", "name", "email", "description", "reason", "img_url", "paypal", "thank_you_msg",
        "owner", "company_type", "lat", "lon", "items"];

  constructor(private route: ActivatedRoute, public router: Router) {
      this.route.queryParams.subscribe(params => {
          if (this.router.getCurrentNavigation().extras.state) {
              this.companyData = this.router.getCurrentNavigation().extras.state;

              /* console.log("in constructor: " + this.companyData); */

              let tmp = [];
              let iter = [];

              for (const key in this.companyData) {
                  const item: string = this.companyData[key];

                  for (let i = 0; i < this.infoTags.length; i++) {

                      if (this.infoTags[i] == "items") {

                          if (item["items"] == undefined) {
                              tmp.push([0, "0", "0", 0]);
                          } else {
                              tmp.push(item[this.infoTags[i]]);
                          }
                      } else {
                          tmp.push(item[this.infoTags[i]]);
                      }
                  }
              }

              console.log(tmp);

              this.companyInformations = new CompanyDetails();



          } else {
              console.log("something went wrong")
          }
      });
  }

  ngOnInit() {
  }



}
