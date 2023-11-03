const { generateRcpCode, generateIvcCode, generateSolCode } = require("../util/GenerateCode");
const { printBill } = require("../util/Print");
const ResponseFormat = require("../util/ResponseFormat");
const RoomPriceCalculate = require("../util/RoomPriceCalculate");
const { getShift } = require("../util/WorkTime");
const { isMbl } = require("../util/date")
const {directPayment} = require('../controller/PaymentController');

const testController = async (req, res) =>{
    try {
        printBill('')
        res.send(ResponseFormat(true,))
    } catch (err) {
        res.send(ResponseFormat(false, null, err.toString()))
    }
}

module.exports = testController;