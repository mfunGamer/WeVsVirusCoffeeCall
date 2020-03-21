const express = require('express')
const app = express()
const port = 3000

app.get('/company', function(req,res){
    res.send("Please implement me")
});

app.post('/company', function(req,res){
    res.send("Please implement me")
});

app.get('/companylist', function(req,res){
    res.send("Please implement me")
});

app.get('/items', function(req,res){
    res.send("Please implement me")
});

app.listen(port, () => console.log(`Running WeVsVirus Backend on port ${port}!`));