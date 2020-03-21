//imports
const utility = require("./utility.js");
const database = reqire("./db.js");

db = database.getDB();

function getCompanyHandler(req,res){
    //Checking if all required parameters have a value
    missingParam = utility.requireParameters(["id"],req);
    if(missingParam) {
        res.status = 400;
        res.send("400 Bad Request: Missing parameter " + missingParam + ".");
        return;
    }
    db.oneOrNone('SELECT id, name, email, description, reason, img_url, paypal, thank_you_msg FROM company WHERE id = $1',id)
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
        "itemids"
    ],req);
    if(missingParam) {
        res.status = 400;
        res.send("400 Bad Request: Missing parameter " + missingParam + ".")
        return
    }
    res.send("Please implement me")
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