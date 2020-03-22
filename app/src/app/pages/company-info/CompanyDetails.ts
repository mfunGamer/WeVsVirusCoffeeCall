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
    public lat: number;
    public long: number;
    public items:any;

    public contact:string;
    public location:string;
    public mainPicture:any;

    /**["id", "name", "email", "description", "reason", "img_url", "paypal", "thank_you_msg", "owner", "company_type", "lat", "lon", "items"]
     * [0,     1,         2,          3,        4,         5,         6,          7,            8,          9,          10,    11,     12]
     * */
    constructor(informations) {

        this.id = informations[0];
        this.name = informations[1];
        this.email = informations[2];
        this.description = informations[3];
        this.reason = informations[4];
        this.img_url = informations[5];
        this.ppAdress = informations[6];
        this.tyMsg = informations[7];
        this.owner = informations[8];
        this.companyTyp = informations[9];
        this.lat = informations[10];
        this.long = informations[11];
        this.items = informations[12];
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
        return "LAT: " + this.lat + ", LON: " + this.long;
    }

    getCompanyMainPicture() {
        return this.img_url;
    }

    getCompanyTyMsg() {
        return this.tyMsg;
    }
}