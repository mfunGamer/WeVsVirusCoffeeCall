//imports
const utility = require("./utility.js");
const database = require("./db.js");

db = database.getDB();

function getCompanyHandler(req,res){
    //Checking if all required parameters have a value
    missingParam = utility.requireParameters(["id"],req);
    if(missingParam) {
        res.status = 400;
        res.send("400 Bad Request: Missing parameter " + missingParam + ".");
        return;
    }
    db.oneOrNone(`SELECT id, name, email, description, reason, img_url, paypal, thank_you_msg FROM company WHERE id = $1`,req.query.id)
        .then(company => {
            res.json(company);
        });
}

function createCompanyHandler(req,res){
    //Checking if all required parameters have a value
    missingParam = utility.requireBodyParameters([
        "name",
        "email",
        "description",
        "reason",
        "imgurl",
        "paypal",
        "thankyou",
        "itemids",
        "street",
        "streetno",
        "zipcode",
        "city"
    ],req);
    if(missingParam) {
        res.status = 400;
        res.send("400 Bad Request: Missing parameter " + missingParam + ".")
        return
    }
    bd = req.body
    db.one(`INSERT INTO company (name, email, description, reason, img_url, paypal, thank_you_msg, street, street_no, zip_code, city ) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id`, 
        bd.name, bd.email, bd.description, bd.reason, bd.imgurl, bd.paypal, bd.thankyou, bd.street, bd.streetno, bd.zipcode, bd.city)
        .then((id) => Promise.all(
            bd.itemids.map(itemID => db.none(`INSERT INTO company_offers_item (company_id, item_id) VALUES ($1 , $2)`, id, itemID)))
        )
        .then(() => {
            res.send("Success!")
        });
}

function getCompanyListHandler(req,res){
    //Checking if all required parameters have a value
    missingParam = utility.requireParameters(["lat", "lon"],req);
    if(missingParam) {
        res.status = 400;
        res.send("400 Bad Request: Missing parameter " + missingParam + ".")
        return;
    }

    page = 1;
    if (req.query.page) {
        page = req.query.page;
    }

    res.send("Please implement me");
}

module.exports.get = getCompanyHandler;
module.exports.create = createCompanyHandler;
module.exports.getList = getCompanyListHandler;