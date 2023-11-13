const promoRoomTable = require('../model/IHP_PromoRoom');
const promoFoodTable = require('../model/IHP_PromoFood');
const ResponseFormat = require('../util/ResponseFormat');

const getPromoRoom = async(req, res) =>{
    try {
        const promoData = await promoRoomTable.findAll({
            where:{
                Status: 1
            },
            raw: true
        });

        res.send(ResponseFormat(true, promoData));
    } catch (err) {
        res.send(ResponseFormat(false, err.toString()));
    }
}

const getPromoFood = async(req, res) =>{
    try {
        const promoData = await promoFoodTable.findAll({
            where:{
                Status: 1
            },
            raw: true
        });

        res.send(ResponseFormat(true, promoData))
    } catch (err) {
        res.send(ResponseFormat(false, err.toString()));
    }
}

module.exports = {
    getPromoRoom,
    getPromoFood
}