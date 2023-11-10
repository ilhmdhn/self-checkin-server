
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const preference = require('./src/util/preferences');
const port = preference().port;

//---------------IMPORT ROUTER--------------
const roomRoute = require('./src/route/RoomRoute');
const fnbRoute = require('./src/route/FnbRoute');
const pricingRoute = require('./src/route/PricingRoute');
const checkinRoute = require('./src/route/CheckinRoute');
const paymentRoute = require('./src/route/PaymentRoute');
const testController = require("./src/controller/TestController");
const { getDetailRoom } = require("./src/controller/RoomController");
const { getFnbPaging } = require("./src/controller/FnbController");
const { listPaymentMethod, generateQrisPayment } = require("./src/controller/PaymentController");

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

app.use(roomRoute);
app.use(fnbRoute);
app.use(pricingRoute);
app.use(checkinRoute);
app.use(paymentRoute);

app.get('/test', (req, res)=>[
    listPaymentMethod(req, res)
    // testController(req, res)
])
app.get('/test2', (req, res)=>[
    generateQrisPayment(req, res)
])