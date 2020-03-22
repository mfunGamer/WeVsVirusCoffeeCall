//Imports
const express = require("express");
const bodyParser = require("body-parser");
const database = require("./src/db.js");
const utility = require("./src/utility.js")
const config = require("config");
const cors = require("cors");
const morgan = require("morgan");

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

app.use(cors());
app.use(bodyParser.json());
app.use(morgan("combined"));

app.get("*", utility.validateParams);
app.post("*", utility.validateBody);

//Company Endpoints
app.get("/company", companyHandler.get);
app.post("/company", companyHandler.create);
app.get("/companylist", companyHandler.getList);

//Item Endpoints
app.get("/items", itemHandler.get);

app.listen(port, () => console.log(`Running WeVsVirus Backend on port ${port}!`));