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
    if(Object.values(req.query).some(elm => elm == "")){
        res.status = 400;
        res.send("400 Bad Request: Empty parameters.");
        return;
    }
    next();
}

function validateBody(req, res, next) {
    if(Object.values(req.body).some(elm => elm == "")){
        res.status = 400;
        res.send("400 Bad Request: Empty parameters.");
        return;
    }
    next();
}

function catchInternalError(err, req, res, next){
    console.log(err)
    res.status = 500;
    res.send("500 Internal Server Error");
    return;
}

module.exports.requireParameters = requireParameters;
module.exports.requireBodyParameters = requireBodyParameters;

module.exports.validateParams = validateParams;
module.exports.validateBody = validateBody;

module.exports.catchInternalError = catchInternalError;