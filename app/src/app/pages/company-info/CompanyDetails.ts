export class CompanyDetails {
    public id:any;
    public name:string;
    public email:string;
    public description:string;
    public reason:string;
    public img_url:string;
    public icon:any;
    public ppAdress:string;
    public tyMsg:string;
    public owner:string;
    public companyTyp:string;
    public lat: string;
    public long: string;
    public items:any;

    public contact:string;
    public location:string;
    public mainPicture:any;


    constructor(informations) {

        this.id = informations[0];
        this.name = informations[1];
        this.email = informations[2];
        this.description = informations[3];
        this.reason = informations[4];
        this.img_url = informations[5];
        this.icon = informations[6];
        this.ppAdress = informations[7];
        this.tyMsg = informations[8];
        this.owner = informations[9];
        this.companyTyp = informations[10];
        this.lat = informations[11];
        this.long = informations[12];
        this.items = informations[13];
    }


    /*
    constructor() {
    }
    */

    setCompanyMainPicture(pic) {
        this.mainPicture = pic;
    }

    setCompanyID(compID) {
       this.id =  compID;
    }

    setCompanyDescription(text) {
        this.description = text;
    }

    setCompanyName(compName) {
        this.name = compName;
    }

    setCompanyItems(item_list) {
        this.items = item_list;
    }

    setCompanyIcon(company_icon) {
        this.icon = company_icon;
    }

    setCompanyContact(contactinfo) {
        this.contact = contactinfo
    }

    setCompanyLocation(locinfo) {
        this.location = locinfo
    }

    getCompanyID() {
        return this.id
    }

    getCompanyDescription() {
        return this.description;
    }

    getCompanyName() {
        return this.name;
    }

    getCompanyItems() {
        return this.items;
    }

    getCompanyIcon() {
        return this.icon;
    }

    getCompanyContact() {
        return this.email;
    }

    getCompanyLocation() {
        return this.location;
    }

    getCompanyMainPicture() {
        return this.img_url;
    }

    getCompanyTyMsg() {
        return this.tyMsg;
    }
}