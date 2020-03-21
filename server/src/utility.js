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

module.exports.requireParameters = requireParameters;
module.exports.requireBodyParameters = requireBodyParameters;