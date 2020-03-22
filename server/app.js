//Imports
const express = require("express");
const config = require("config");
//Middleware
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
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

//Initialize Limiter
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 300 // limit each IP to 300 requests per windowMs
});

//Handlers
const companyHandler = require("./src/company.js");
const itemHandler = require("./src/item.js");

//External Middleware
app.use(cors());    //Preflight Request Handling
app.use(bodyParser.json()); //Parsing JSON
app.use(morgan("combined"));    //Logging Requests
app.use(limiter);   //Rate Limiting

//Making sure no query string or body has empty values.
app.get("*", utility.validateParams);
app.post("*", utility.validateBody);

//Company Endpoints
app.get("/company", companyHandler.get);
app.post("/company", companyHandler.create);
app.get("/companylist", companyHandler.getList);

//Item Endpoints
app.get("/items", itemHandler.get);

app.listen(port, () => console.log(`Running WeLL Backend on port ${port}!`));