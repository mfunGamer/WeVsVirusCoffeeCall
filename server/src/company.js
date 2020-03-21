//imports
const rp = require("request-promise")
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
    let bd = req.body
    //Still need to implement input validation

    //Geocode address to lat/lon using the Nominatim API.
    rp({
        uri:"https://nominatim.openstreetmap.org/search",
        qs: {
            street: bd.street + " " + bd.streetno,
            city: bd.city,
            postalcode: bd.zipcode,
            format: "json"
        },
        headers: {
            "Referer":"http://137.74.140.50/"
        },  
        json: true
    }).then((locInformation) => {
        //Need to implement error handling for empty response or timeout
        let lat = locInformation[0].lat;
        let lon = locInformation[0].lon;

        //Insert company into DB
        db.one(`
            INSERT INTO company (
                name, 
                email,
                description, 
                reason, 
                img_url, 
                paypal, 
                thank_you_msg, 
                street, 
                street_no, 
                zip_code, 
                city,
                location) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, ST_SetSRID(ST_Point($12, $13), 4326)::geography) 
            RETURNING id`, 
            [bd.name, bd.email, bd.description, bd.reason, bd.imgurl, bd.paypal, bd.thankyou, bd.street, bd.streetno, bd.zipcode, bd.city, lon, lat])
        //Then add all items to the company
        .then((id) => Promise.all(
            bd.itemids.map(itemID => db.none(`INSERT INTO company_offers_item (company_id, item_id) VALUES ($1 , $2)`, [id.id, itemID])))
        )
        .then(() => {
            res.send("Success!")
        });
    });
}

function getCompanyListHandler(req,res){
    //Checking if all required parameters have a value
    missingParam = utility.requireParameters(["lat", "lon", "radius"],req);
    if(missingParam) {
        res.status = 400;
        res.send("400 Bad Request: Missing parameter " + missingParam + ".")
        return;
    }

    db.manyOrNone(`
        SELECT 
            id,
            name,
            email,
            description,
            reason,
            imgurl,
            paypal,
            thankyou
        FROM company
        WHERE ST_DWithin(location, ST_SetSRID(ST_MakePoint($1, $2), 4326)::geography, $3)`,
        [req.query.lon, req.query.lat, req.query.radius])
    .then((companies) => {
        res.json(companies);
    });
}

module.exports.get = getCompanyHandler;
module.exports.create = createCompanyHandler;
module.exports.getList = getCompanyListHandler;