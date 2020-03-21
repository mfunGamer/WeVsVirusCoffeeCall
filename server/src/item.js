//imports
const utility = require("./utility.js")

function getItemsHandler(req,res){
    //Checking if all required parameters have a value
    missingParam = utility.requireParameters(["id"],req);
    if(missingParam) {
        res.status = 400;
        res.send("400 Bad Request: Missing parameter " + missingParam + ".")
        return
    }
    res.send("Please implement me")
}

module.exports.get = getItemsHandler;