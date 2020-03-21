import { Component, OnInit } from '@angular/core';
import {CompanyDetails} from "./CompanyDetails";
import {Items} from "./Items";

@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.page.html',
  styleUrls: ['./company-info.page.scss'],
})
export class CompanyInfoPage implements OnInit {

  public total_sum : number = null;
  public all_articles : any = [];
  public added_articles : any = [];
  public numOfItems : any = null;

  public companyInformations : CompanyDetails;

  constructor() {
    this.total_sum = 0;
    this.companyInformations = new CompanyDetails();

    this.runInitial();
  }

  ngOnInit() {
  }

  printHelloMessage(txt) {
    console.log(txt);
  }

  addArticles(num, item) {
    this.total_sum += num;
    this.added_articles.push(item);
    /*console.log(this.getSpecificItem());*/
  }

  getSpecificItem(){
    let tmp = [];
    for(let i = 0; i < this.added_articles.length; i++){
      tmp.push(this.added_articles[i].getItemName())
    }

    return tmp;
  }

  runInitial() {
    this.companyInformations.setCompanyDescription("[Einige Informationen, Öffnugszeiten etc.] Wir sind ein lustiges Restaurant mit Essen und Trinken für manche Leute.");
    this.companyInformations.setCompanyItems([[0, "Kaffee", "some icon", 1.20],
      [1, "Limo", "some icon", 2.10],
      [2, "Cocktail", "some icon", 3.00],
      [3, "Bier", "some icon", 5.00],
      [4, "Wasser", "some icon", 9.00]]);

    for(let i = 0; i < this.companyInformations.getCompanyItems().length; i++){
      let item = this.companyInformations.getCompanyItems()[i];
      this.all_articles.push(new Items(item[0], item[1], item[2], item[3]));
    }

    this.numOfItems = this.all_articles.length;
  }

}
