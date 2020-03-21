function requireParameters(params, req){
    for(let i=0; i < params.length; i++){
        if (!(params[i] in req.query)){
            return params[i];
        }
    }
}

function requireBodyParameters(params, req){
    for(let i=0; i < params.length; i++){
        if (!(params[i] in req.body)){
            return params[i];
        }
    }
}

function validateParams(req, res, next) {
    if(req.query.values().some(elm => elm == "")){
        res.status = 400;
        res.send("400 Bad Request: Empty parameters.");
        return;
    }
    next();
}

function validateBody(req, res, next) {
    if(req.body.values().some(elm => elm == "")){
        res.status = 400;
        res.send("400 Bad Request: Empty parameters.");
        return;
    }
    next();
}

module.exports.requireParameters = requireParameters;
module.exports.requireBodyParameters = requireBodyParameters;

module.exports.validateParams = validateParams;
module.exports.validateBody = validateBody;