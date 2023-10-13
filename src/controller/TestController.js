const { generateRcpCode, generateIvcCode, generateSolCode } = require("../util/GenerateCode");
const ResponseFormat = require("../util/ResponseFormat");
const RoomPriceCalculate = require("../util/RoomPriceCalculate");
const { getShift } = require("../util/WorkTime");
const { isMbl } = require("../util/date")

const testController = async (req, res) =>{
    try {

        const rcp = await generateRcpCode()
        const ivc = await generateIvcCode()
        const sol = await generateSolCode()

        res.send(ResponseFormat(true, {
            rcp_code: rcp,
            ivc_code: ivc,
            sol_code: sol,
        }))
    } catch (err) {
        res.send(ResponseFormat(false, null, err.toString()))
    }
}

module.exports = testController;