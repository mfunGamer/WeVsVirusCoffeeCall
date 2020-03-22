/**
 * Module handling utility functions such as request validation.
 * @module utility
 */

 /**
  * Checks if all parameter names in params are in the request query object.
  * @param {Array} params - the required parameters
  * @param {*} req - the request object to validate
  */
function requireParameters(params, req){
    for(let i=0; i < params.length; i++){
        if (!(params[i] in req.query)){
            return params[i];
        }
    }
}

 /**
  * Checks if all parameter names in params are in the request body object.
  * @param {Array} params - the required parameters
  * @param {*} req - the request object to validate
  */
function requireBodyParameters(params, req){
    for(let i=0; i < params.length; i++){
        if (!(params[i] in req.body)){
            return params[i];
        }
    }
}

/**
 * Middleware that sends a 400 Bad Request response if any element 
 * in the query object is empty.
 * @param {*} req the request object
 * @param {*} res the response opject
 * @param {*} next the next handler
 */
function validateParams(req, res, next) {
    if(Object.values(req.query).some(elm => elm == "")){
        res.status = 400;
        res.send("400 Bad Request: Empty parameters.");
        return;
    }
    next();
}

/**
 * Middleware that sends a 400 Bad Request response if any element 
 * in the body object is empty.
 * @param {*} req the request object
 * @param {*} res the response opject
 * @param {*} next the next handler
 */
function validateBody(req, res, next) {
    if(Object.values(req.body).some(elm => elm == "")){
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