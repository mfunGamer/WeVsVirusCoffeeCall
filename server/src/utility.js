function requireParameters(params, req){
    for(let i=0; i < params.length; i++){
        if (!(params[i] in req.query)){
            return params[i];
        }
    }
}

module.exports.requireParameters = requireParameters;