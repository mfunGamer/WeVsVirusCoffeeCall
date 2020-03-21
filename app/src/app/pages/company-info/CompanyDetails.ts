export class CompanyDetails {
    public id:any;
    public description:string;
    public name:string;
    public items:any;
    public icon:any;
    public contact:string;
    public location:string;
    public mainPicture:any;

    constructor() {
    }

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
        return this.contact;
    }

    getCompanyLocation() {
        return this.location;
    }

    getCompanyMainPicture() {
        return this.mainPicture;
    }
}