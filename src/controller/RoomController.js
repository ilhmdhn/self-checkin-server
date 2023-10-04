const roomTable = require('../model/IHP_Room');
const responseFormat = require('../util/ResponseFormat')

const getRoomCategory = (req, res) =>{
    try {
        res.send(responseFormat(true, 'Success', []))
    } catch (error) {
        res.send(responseFormat(false, error, []))
    }
}

module.exports = {
    getRoomCategory
}