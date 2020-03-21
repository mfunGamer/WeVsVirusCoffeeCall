//Imports
const express = require("express");
const bodyParser = require("body-parser");
const database = require("./src/db.js");
const utility = require("./src/utility.js")

//Initializing ExpressJs
const app = express();
app.use(bodyParser.json());
const port = 3000;

//Initialize DB
database.initDB();

//Handlers
const companyHandler = require("./src/company.js");
const itemHandler = require("./src/item.js");

app.get("/", utility.validateParams);
app.post("/", utility.validateBody);

//Company Endpoints
app.get("/company", companyHandler.get);
app.post("/company", companyHandler.create);
app.get("/companylist", companyHandler.getList);

//Item Endpoints
app.get("/items", itemHandler.get);

app.listen(port, () => console.log(`Running WeVsVirus Backend on port ${port}!`));