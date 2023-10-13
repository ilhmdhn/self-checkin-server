const rcpTable = require('../model/IHP_Rcp');
const roomCheckinTable = require('../model/IHP_RoomCheckin');
const roomTable = require('../model/IHP_Room');
const rcpDetailRoomTable = require('../model/IHP_Rcp_DetailsRoom');
const ivcTable = require('../model/IHP_Ivc');
const ResponseFormat = require('../util/ResponseFormat');

const checkinPayLater = (req, res) =>{
    try {
        console.log(req.body)
        res.send(ResponseFormat(true))
    } catch (err) {
        res.send(ResponseFormat(false, null, err))
    }
}

module.exports = {
    checkinPayLater
}