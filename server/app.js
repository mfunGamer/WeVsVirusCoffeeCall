//Imports
const express = require("express");
const config = require("config");
//Middleware
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
//Internal modules
const database = require("./src/db.js");
const utility = require("./src/utility.js");

//Loading Config
conf = config.get('serverConf');

//Initializing ExpressJs
const app = express();
const port = conf.port;

//Initialize DB
database.initDB();

//Handlers
const companyHandler = require("./src/company.js");
const itemHandler = require("./src/item.js");

//External Middleware
app.use(cors());    //Preflight Request Handling
app.use(bodyParser.json()); //Parsing JSON
app.use(morgan("combined"));    //Logging Requests

//Making sure no query string or body has empty values.
app.get("*", utility.validateParams);
app.post("*", utility.validateBody);

//Company Endpoints
app.get("/company", companyHandler.get);
app.post("/company", companyHandler.create);
app.get("/companylist", companyHandler.getList);

//Item Endpoints
app.get("/items", itemHandler.get);

app.listen(port, () => console.log(`Running WeVsVirus Backend on port ${port}!`));