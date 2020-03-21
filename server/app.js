//Imports
const express = require("express");
const bodyParser = require("body-parser");
const pgp = require("pg-promise")();
const config = require("config");

//Loading Config
dbConf = config.get('dbConfig');

//Initializing DB
var db = pgp(dbConf);

//Initializing ExpressJs
const app = express();
app.use(bodyParser.json());
const port = 3000;

//Handlers
const companyHandler = require("./src/company.js");
const itemHandler = require("./src/item.js");

//Company Endpoints
app.get("/company", companyHandler.get);
app.post("/company", companyHandler.create);
app.get("/companylist", companyHandler.getList);

//Item Endpoints
app.get("/items", itemHandler.get);

app.listen(port, () => console.log(`Running WeVsVirus Backend on port ${port}!`));