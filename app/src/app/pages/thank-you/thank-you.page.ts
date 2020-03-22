import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CompanyDetails} from "../company-info/CompanyDetails";

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

    public infoTags = ["id", "name", "email", "description", "reason", "img_url", "paypal", "thank_you_msg",
        "owner", "company_type", "lat", "lon", "items"];

  constructor(private route: ActivatedRoute, public router: Router) {
      this.route.queryParams.subscribe(params => {
          if (this.router.getCurrentNavigation().extras.state) {
              this.companyData = this.router.getCurrentNavigation().extras.state;

              /* console.log("in constructor: " + this.companyData); */


              let count = 0;

              for (const key in this.companyData) {
                  const item: string = this.companyData[key];

                  /*if (item["items"] == undefined) {
                      tmp.push([0, "0", "0", 0]);
                  } else {
                      tmp.push(item[this.infoTags[i]]);
                  }*/

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



}
