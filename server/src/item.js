function getItemsHandler(req,res){
    //Checking if all required parameters have a value
    if(!req.query.id) {
        res.status = 400;
        res.send("400 Bad Request: Missing parameter id.")
        return
    }
    res.send("Please implement me")
}

module.exports.get = getItemsHandler;