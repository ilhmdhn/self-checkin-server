const ResponseFormat = require("../util/ResponseFormat");
const { getShift } = require("../util/WorkTime");
const { isMbl } = require("../util/date")

const testController = async (req, res) =>{
    try {
        const hasil = await getShift()
        console.log('hasil ', hasil)
        res.send(ResponseFormat(true, null))
    } catch (err) {
        res.send(ResponseFormat(false, null, err.toString()))
    }
}

module.exports = testController;