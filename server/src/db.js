/**
 * Module handling the shared pg promise DB object and its initialization.
 * @module db
 */

 //Imports
const pgp = require("pg-promise")();
const config = require("config");

//Shared db object
let db;

/**
 * Initializing the DB using the connection parameters from the default config.
 */
function initDB(){
    //Loading Config
    dbConf = config.get('dbConfig');
    //Initializing DB
    db = pgp(dbConf);
}

/**
 * Returns the shared DB object
 * @returns {pg-promise.Database} - the DB object
 */
function getDB() {
    return db;
}

module.exports.initDB = initDB;
module.exports.getDB = getDB;