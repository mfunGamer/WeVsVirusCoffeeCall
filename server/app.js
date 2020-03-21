//Imports
const express = require("express");
const bodyParser = require("body-parser");

//Handlers
const companyHandler = require("./src/company.js");
const itemHandler = require("./src/item.js");

//Initializing ExpressJs
const app = express();
app.use(bodyParser.urlencoded());
app.use(bodyParser.text());
const port = 3000;

//Company Endpoints
app.get("/company", companyHandler.get);
app.post("/company", companyHandler.create);
app.get("/companylist", companyHandler.getList);

//Item Endpoints
app.get("/items", itemHandler.get);

app.listen(port, () => console.log(`Running WeVsVirus Backend on port ${port}!`));