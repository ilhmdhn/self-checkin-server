const roomTable = require('../model/IHP_Room');
const responseFormat = require('../util/ResponseFormat')
const { Sequelize, DataTypes, Op } = require('sequelize');
const sqlz = require('../util/sqlz');
const jenisKamarTable = require('../model/IHP_Jenis_Kamar');
const { default: axios } = require('axios');
const getPreferences = require('../util/preferences');
const { numberDate } = require('../util/date');
const { getDateTime } = require('../util/WorkTime');
const moment = require('moment');
const ResponseFormat = require('../util/ResponseFormat');
const RoomPriceCalculate = require('../util/RoomPriceCalculate');
const config2Table = require('../model/IHP_Config2');

const getRoomList = async (req, res) => {
    try {

        let roomCategoryResult = [];
        const dateTimeNow = await getDateTime();
        const timeNow = moment(dateTimeNow, 'YYYY-MM-DD HH:mm:ss').format('HH:mm:ss');
        const roomCategory = await sqlz.query('SELECT DISTINCT [Jenis_Kamar] as room_type, Kapasitas as capacity FROM IHP_Room', {
            type: Sequelize.QueryTypes.SELECT,
            raw: true
        });

        const dateNumber = await numberDate();
        const detailCategory = await axios.get(`https://adm.happypuppy.id/Api/type_room?outlet=${getPreferences().outlet}`)

        const roomPrice = await jenisKamarTable.findAll({
            where: {
                Hari: dateNumber,
                Time_Start: {
                    [Op.lte]: timeNow
                },
            },
            order: [
                ['Time_Start', 'DESC'],
            ],
            raw: true
        });

        for (let i = 0; i < roomCategory.length; i++) {
            const detail = detailCategory.data.data.find(category => category.room_type === roomCategory[i].room_type);
            const price = roomPrice.find(price => price.Nama_Kamar === roomCategory[i].room_type)
            if (detail) {
                if (price) {
                    roomCategoryResult.push({
                        category_name: roomCategory[i].room_type,
                        tv_detail: detail.tv,
                        pax: roomCategory[i].capacity,
                        toilet: detail.toilet,
                        price: price.Tarif
                    })
                } else {
                    roomCategoryResult.push({
                        category_name: roomCategory[i].room_type,
                        tv_detail: detail.tv,
                        pax: roomCategory[i].capacity,
                        toilet: detail.toilet,
                        price: 0
                    })
                }
            }
        }
        const dataRoom = await listRoom()
        const data = {
            category: roomCategoryResult,
            room: dataRoom
        }
        res.send(responseFormat(true, data))
    } catch (error) {
        res.send(responseFormat(false, [], error.toString()))
    }
}

const listRoom = () => {
    return new Promise(async(resolve, reject)=>{
        try {
            let listRoomResult = [];
            const listRoom = await roomTable.findAll({
                raw: true
            });
            const listImageTemp = await axios.get(`https://adm.happypuppy.id/Api/getCodeRoomList?outlet=${getPreferences().outlet}`)
            const listImage = listImageTemp.data;
            listRoom.forEach(room => {
                const image = listImage.data.find(imageRoom => imageRoom.code_room == room.Kamar);
    
                if(room.Status_Ready == 1 && room.Status_Checkin == 0 && room.Keterangan_Connect == 2){
                    if(image){
                        listRoomResult.push(
                            {
                                room_code: room.Kamar,
                                room_image: 'https://adm.happypuppy.id/'+image.image,
                                room_category: room.Jenis_Kamar,
                                room_ready: true,
                                room_message: "READY"
                            }
                        )
                    }else{
                        listRoomResult.push(
                            {
                                room_code: room.Kamar,
                                room_image: 'https://adm.happypuppy.id/uploads/Empty.jpg',
                                room_category: room.Jenis_Kamar,
                                room_ready: true,
                                room_message: "READY"
                            }
                        )
                    }
                }else if(room.Status_Ready == 1 && room.Status_Checkin == 1){
                    if(image){
                        listRoomResult.push(
                            {
                                room_code: room.Kamar,
                                room_image: 'https://adm.happypuppy.id/'+image.image,
                                room_category: room.Jenis_Kamar,
                                room_ready: false,
                                room_message: "Room sedang digunakan"
                            }
                        )
                    }else{
                        listRoomResult.push(
                            {
                                room_code: room.Kamar,
                                room_image: 'https://adm.happypuppy.id/uploads/Empty.jpg',
                                room_category: room.Jenis_Kamar,
                                room_ready: false,
                                room_message: "Room sedang digunakan"
                            }
                        )
                    }
                }else if(room.Status_Ready == 1 && room.Status_Checkin == 0 && room.Keterangan_Connect == 1){
                    if(image){
                        listRoomResult.push(
                            {
                                room_code: room.Kamar,
                                room_image: 'https://adm.happypuppy.id/uploads/'+image.image,
                                room_category: room.Jenis_Kamar,
                                room_ready: false,
                                room_message: "Room belum dibersihkan"
                            }
                        )
                    }else{
                        listRoomResult.push(
                            {
                                room_code: room.Kamar,
                                room_image: 'https://adm.happypuppy.id/uploads/Empty.jpg',
                                room_category: room.Jenis_Kamar,
                                room_ready: false,
                                room_message: "Room belum dibersihkan"
                            }
                        )
                    }
                }
            });
    
            resolve(listRoomResult)
        } catch (err) {
            reject(err)
        }
    });
}

const getDetailRoom = async(req, res) =>{
    try {
        const roomCode = req.query.room_code;
        const detailCategoryResponse = await axios.get(`https://adm.happypuppy.id/Api/getDetailRoom?outlet_code=${getPreferences().outlet}&room_code=${roomCode}`);
        const detailCategory = detailCategoryResponse.data;
        let roomReady;
        let roomMessage;

        if(!detailCategory.state){
            throw detailCategory.message;
        }
        const roomDetailTemp = await roomTable.findAll({
            where:{
                Kamar: detailCategory.data.room_code,
                Jenis_Kamar: detailCategory.data.room_category,
            },
            raw: true
        });

        const roomDetail = roomDetailTemp[0];
        const dateNumber = await numberDate();
        const dateTimeNow = await getDateTime();
        const timeNow = moment(dateTimeNow, 'YYYY-MM-DD HH:mm:ss').format('HH:mm:ss');

        const roomPriceTemp = await jenisKamarTable.findAll({
            where: {
                Hari: dateNumber,
                Time_Start: {
                    [Op.lte]: timeNow
                },
                Nama_Kamar: roomDetail.Jenis_Kamar
            },
            order: [
                ['Time_Start', 'DESC'],
            ],
            raw: true
        });

        const roomPrice = roomPriceTemp[0];

        console.log('DEBUGGIN roomPrice', roomPrice)

        if(roomDetail.Status_Ready == 1 && roomDetail.Status_Checkin == 0 && roomDetail.Keterangan_Connect == 2){
            roomReady = true;
            roomMessage = "READY";
        }else if(roomDetail.Status_Ready == 1 && roomDetail.Status_Checkin == 1){
            roomReady = false;
            roomMessage = "Room sedang digunakan";
        }else if(roomDetail.Status_Ready == 1 && roomDetail.Status_Checkin == 0 && roomDetail.Keterangan_Connect == 1){
            roomReady = false;
            roomMessage = "Room belum dibersihkan";
        }

        const response = {
            room_code:  roomCode,
            room_category:  roomDetail.Jenis_Kamar,
            tv_detail:  detailCategory.data.tv,
            pax:  roomDetail.Kapasitas,
            toilet:  detailCategory.data.toilet,
            price:  roomPrice.Tarif,
            room_ready:  roomReady,
            room_message: roomMessage,
            room_galery: detailCategory.data.image
        }

        res.send(ResponseFormat(true, response))
    } catch (err) {
        res.send(ResponseFormat(false, null, err.toString()))
    }
}

const roomPriceData = (req, res) =>{
    return new Promise(async(resolve, reject)=>{
        try {
            const roomCategory = req.query.room_category;
            const durationCheckin = req.query.checkin_duration;
            let roomTotal = 0;

            const config2Temp = await config2Table.findAll({
                where:{
                    Data: 1
                }
            });

            const config = config2Temp[0];


            const roomPrice = await RoomPriceCalculate(roomCategory, durationCheckin);

            roomPrice.forEach(data => {
                roomTotal = roomTotal + data.room_total
            });

            const serviceRoom = config.Service_Persen_Room * roomTotal / 100;
            const taxRoom = config.Tax_Persen_Room * (roomTotal + serviceRoom) / 100;
            const priceTotal = serviceRoom + taxRoom + roomTotal;

            const data = {
                room:roomTotal,
                service_room: serviceRoom,
                tax_room: taxRoom,
                price_total : priceTotal,
                detail:roomPrice
            }
            res.send(ResponseFormat(true, data));
        } catch (err) {
            res.send(ResponseFormat(false, null, err.toString()))
        }
    })
}

const listCategoryFnB = async(req, res) =>{
    try {
        
    } catch (err) {
        
    }
}

const listFnB = () =>{

}

module.exports = {
    getRoomList,
    getDetailRoom,
    roomPriceData
}