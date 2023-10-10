const ResponseFormat = require("../util/ResponseFormat");
const RoomPriceCalculate = require("../util/RoomPriceCalculate");
const { getShift } = require("../util/WorkTime");
const { isMbl } = require("../util/date")

const testController = async (req, res) =>{
    try {
        const roomCategory = req.query.room_category;
        const durationCheckin = req.query.checkin_duration;

        const hasil = await RoomPriceCalculate(roomCategory, durationCheckin)
        
        let tarifTotal = 0;

        hasil.forEach(element => {
            tarifTotal = tarifTotal + element.room_total
        });

        res.send(ResponseFormat(true, hasil))
    } catch (err) {
        res.send(ResponseFormat(false, null, err.toString()))
    }
}

module.exports = testController;