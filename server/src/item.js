//imports
const utility = require("./utility.js")

async function getItemsHandler(req,res){
    try {
        //Checking if all required parameters have a value
        missingParam = utility.requireParameters(["id"],req);
        if(missingParam) {
            res.status = 400;
            res.send("400 Bad Request: Missing parameter " + missingParam + ".")
            return
        }
        item =  await db.oneOrNone(`SELECT name, icon_url, price, id FROM item WHERE id = $1`,req.query.id)
        res.json(item);
    }
    catch (e){
        console.log(e);
        res.status(500);
        res.send("500 Internal Server Error");
    }
}

module.exports.get = getItemsHandler;