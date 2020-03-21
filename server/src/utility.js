function requireParameters(params, req){
    console.log(params)
    console.log(req.query)
    for(let i=0; i < params.length; i++){
        console.log(!(params[i] in req.query))
        console.log(params[i])
        if (!(params[i] in req.query)){
            return params[i];
        }
    }
}

module.exports.requireParameters = requireParameters;