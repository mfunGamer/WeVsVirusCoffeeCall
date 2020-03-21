//imports
const utility = require("./utility.js")

function getCompanyHandler(req,res){
    //Checking if all required parameters have a value
    missingParam = utility.requireParameters(["id"],req);
    console.log(missingParam)
    if(missingParam) {
        res.status = 400;
        res.send("400 Bad Request: Missing parameter " + missingParam + ".")
        return
    }
    res.send("Please implement me")
}

function createCompanyHandler(req,res){
    res.send("Please implement me")
}

function getCompanyListHandler(req,res){
    //Checking if all required parameters have a value
    missingParam = utility.requireParameters(["lat", "lon"],req);
    if(missingParam) {
        res.status = 400;
        res.send("400 Bad Request: Missing parameter " + missingParam + ".")
        return
    }

    page = 1;
    if (req.query.page) {
        page = req.query.page
    }

    res.send("Please implement me")
}

module.exports.get = getCompanyHandler;
module.exports.create = createCompanyHandler;
module.exports.getList = getCompanyListHandler;