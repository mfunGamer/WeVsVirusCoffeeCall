export class CompanyDetails {
    public id:any;
    public description:string;
    public name:string;
    public items:any;
    public icon:any;

    constructor() {
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
}