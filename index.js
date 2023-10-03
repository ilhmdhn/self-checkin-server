
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const preference = require('./src/util/preferences');


const port = preference().port;

//---------------CREATE MIDLEWARE--------------
const loggerRequest = (req, res, next) =>{
    console.log(`Receive request ${req.method} ${req.originalUrl}`)
    next()
}

const addPoweredHeader = (req, res, next) =>{
    res.set("X-Powered-By", "PT Imperium Happy Puppy")
    next()
}

//---------------USE MIDLEWARE--------------
app.use(loggerRequest);
app.use(addPoweredHeader);
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});

app.get('/', async (req, res) =>{
    res.json({
        state: true
    });
});