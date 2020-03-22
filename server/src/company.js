//imports
const rp = require("request-promise")
const utility = require("./utility.js");
const database = require("./db.js");

db = database.getDB();

async function getCompanyHandler(req, res, next){
    try {
        //Checking if all required parameters have a value
        missingParam = utility.requireParameters(["id"],req);
        if(missingParam) {
            res.status = 400;
            res.send("400 Bad Request: Missing parameter " + missingParam + ".");
            return;
        }
        company = await db.oneOrNone(`SELECT id, name, email, description, reason, img_url, paypal, thank_you_msg, owner, company_type FROM company WHERE id = $1 AND approved == TRUE`,req.query.id);
        items = await db.manyOrNone(`SELECT name, icon_url, price, id FROM item JOIN company_offers_item ON item.id = company_offers_item.item_id WHERE company_id = $1`, req.query.id);

        company.items = items;
        res.json(company);
    }
    catch (e){
        console.log(e);
        res.status = 400;
            res.send("500 Internal Server Error");
    }
}

async function createCompanyHandler(req,res){
    try {
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
            "city",
            "type",
            "owner"
        ],req);
        if(missingParam) {
            res.status = 400;
            res.send("400 Bad Request: Missing parameter " + missingParam + ".")
            return
        }
        let bd = req.body

        //Geocode address to lat/lon using the Nominatim API.
        locInformation = await rp({
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
        });
        //Need to implement error handling for empty response or timeout
        let lat = locInformation[0].lat;
        let lon = locInformation[0].lon;

        //Insert company into DB
        id = await db.one(`
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
                company_type,
                owner,
                location) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, ST_SetSRID(ST_Point($14, $15), 4326)::geography) 
            RETURNING id`, 
            [bd.name, bd.email, bd.description, bd.reason, bd.imgurl, bd.paypal, bd.thankyou, bd.street, bd.streetno, bd.zipcode, bd.city, bd.type, bd.owner, lon, lat]);
        //Then add all items to the company
        await Promise.all(bd.itemids.map(itemID => db.none(`INSERT INTO company_offers_item (company_id, item_id) VALUES ($1 , $2)`, [id.id, itemID])));
        res.send("Success!");
    }
    catch (e){
        console.log(e);
        res.status = 400;
            res.send("500 Internal Server Error");
    }
}

async function getCompanyListHandler(req,res){
    try{
        //Checking if all required parameters have a value
        missingParam = utility.requireParameters(["lat", "lon", "radius"],req);
        if(missingParam) {
            res.status = 400;
            res.send("400 Bad Request: Missing parameter " + missingParam + ".");
            return;
        }

        //Get all companies within specified distance
        companies = await db.manyOrNone(`
            SELECT 
                id,
                name,
                email,
                description,
                reason,
                img_url,
                paypal,
                thank_you_msg,
                owner,
                company_type
            FROM company
            WHERE approved == TRUE AND ST_DWithin(location, ST_SetSRID(ST_MakePoint($1, $2), 4326)::geography, $3)`,
            [req.query.lon, req.query.lat, req.query.radius]);
        //Then get all corresponding items
        //Create a promise with a db query for every company
        items = await Promise.all(companies.map(company => db.manyOrNone(`
            SELECT 
                name, 
                icon_url, 
                price, 
                id,
                company_id
            FROM item 
            JOIN company_offers_item ON item.id = company_offers_item.item_id 
            WHERE company_id = $1`, 
        company.id)));
        //when they are all resolved match item lists to companies
        companies = companies.map((company) => {
            company.items = items[0].find(item => item.company_id == company.id);
            return company;
        });
        res.json(companies);
    }
    catch (e){
    console.log(e);
    res.status = 400;
        res.send("500 Internal Server Error");
    }
}

module.exports.get = getCompanyHandler;
module.exports.create = createCompanyHandler;
module.exports.getList = getCompanyListHandler;