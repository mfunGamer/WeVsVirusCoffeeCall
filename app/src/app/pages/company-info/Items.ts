export class Items {
    public id:any;
    public name:string;
    public icon:any;
    public value:number;

    constructor(id, name, icon, value) {
        this.id = id;
        this.name = name;
        this.icon = icon;
        this.value = value;
    }

    setItemID(itemID) {
        this.id =  itemID;
    }

    setItemName(itemName) {
        this.name = itemName;
    }

    setItemIcon(itemIcon) {
        this.icon = itemIcon;
    }

    setItemValue(itemVal) {
        this.value = itemVal;
    }

    getItemID() {
        return this.id;
    }

    getItemName() {
        return this.name;
    }

    getItemIcon() {
        return this.icon;
    }

    getItemValue() {
        return this.value;
    }
}