const pgp = require("pg-promise")();
const config = require("config");

let db;

function initDB(){
    //Loading Config
    dbConf = config.get('dbConfig');
    //Initializing DB
    db = pgp(dbConf);
}

function getDB() {
    return db;
}

module.exports.initDB = initDB;
module.exports.getDB = getDB;