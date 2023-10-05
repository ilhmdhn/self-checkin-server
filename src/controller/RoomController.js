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

const getRoomCategory = async (req, res) => {
    try {

        let roomCategoryResult = [];
        const dateTimeNow = await getDateTime();
        const timeNow = moment(dateTimeNow, 'YYYY-MM-DD HH:mm:ss').format('HH:mm:ss');
        const roomCategory = await sqlz.query('SELECT DISTINCT [Jenis_Kamar] as room_type, Kapasitas as capacity FROM IHP_Room', {
            type: Sequelize.QueryTypes.SELECT,
            raw: true
        });

        const dateNumber = await numberDate()
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

        res.send(responseFormat(true, roomCategoryResult))
    } catch (error) {
        res.send(responseFormat(false, [], error.toString()))
    }
}

const getListRoom = async (req, res) => {
    try {
        const roomType = req.query.room_type;
        const listRoom = await roomTable.findAll({
            raw: true
        });
        let listRoomResult = [];
        const listImage = await axios.get(`https://adm.happypuppy.id/Api/getCodeRoomList?outlet=${getPreferences().outlet}`)
        
        listRoom.forEach(room => {
            const image = listImage.data.data.find(imageRoom => imageRoom.code_room == room.Kamar);

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

        res.send(responseFormat(true, listRoomResult));
    } catch (err) {
        res.send(responseFormat(false, [], err.toString()))
    }
}

module.exports = {
    getRoomCategory,
    getListRoom
}