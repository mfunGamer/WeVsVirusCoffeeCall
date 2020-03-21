function getCompanyHandler(req,res){
    //Checking if all required parameters have a value
    if(!req.query.id) {
        res.status = 400;
        res.send("400 Bad Request: Missing parameter id.")
        return
    }
    res.send("Please implement me")
}

function createCompanyHandler(req,res){

    res.send("Please implement me")
}

function getCompanyListHandler(req,res){
    //Checking if all required parameters have a value
    if(!req.query.lat) {
        res.status = 400;
        res.send("400 Bad Request: Missing parameter lat.")
        return
    }
    if(!req.query.lon) {
        res.status = 400;
        res.send("400 Bad Request: Missing parameter lon.")
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