const roomTable = require('../model/IHP_Room');
const responseFormat = require('../util/ResponseFormat')
const { Sequelize, DataTypes } = require('sequelize');
const sqlz = require('../util/sqlz');

const getRoomCategory = async(req, res) =>{
    try {
        const roomCategory = await sqlz.query('SELECT DISTINCT [Jenis_Kamar] FROM IHP_Room', {
            type: Sequelize.QueryTypes.SELECT,
        });
        res.send(responseFormat(true, roomCategory))
    } catch (error) {
        res.send(responseFormat(false, [], error))
    }
}

const getListRoom = async(req, res) =>{
    try {
        const roomType = req.query.room_type;
        
        const listRoom = await roomTable.findAll({
            where:{
                Jenis_Kamar: roomType
            }
        });
        console.log(listRoom)
        res.send(responseFormat(true, listRoom));
    } catch (err) {
        res.send(responseFormat(false, [], err))
    }
}

module.exports = {
    getRoomCategory,
    getListRoom
}