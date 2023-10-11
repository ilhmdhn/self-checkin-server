const roomTypeTable = require('../model/IHP_Jenis_Kamar');
const { numberDate } = require('../util/date');
const { getDateTime } = require('../util/WorkTime');
const moment = require('moment');
const { Sequelize, DataTypes, Op } = require('sequelize');

module.exports = (roomCategory, duration) => {
    return new Promise(async (resolve, reject) => {
        try {
            const timeFormat = 'HH:mm:ss';
            const timeFormatRound = 'HH:mm'
            const dateTimeFormat = 'YYYY-MM-DD HH:mm:ss';

            const dateNumber = await numberDate();
            const dateTimeNow = await getDateTime();
            let timeNow = moment(dateTimeNow, 'YYYY-MM-DD HH:mm:ss').format('HH:mm:ss');
            let minute = duration * 60;
            let roomPriceDetail = []
            do {
                const tarifKamarTemp = await roomTypeTable.findAll({
                    where: {
                        Nama_Kamar: roomCategory,
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
                
                const tarifKamar = tarifKamarTemp[0];
                const datetimeStart = moment(tarifKamar.Time_Start, timeFormat).format(dateTimeFormat);
                const startTimeRounded = moment(tarifKamar.Time_Start, timeFormat).format(timeFormatRound);
                const finishTimeRounded = moment(tarifKamar.Time_Finish, timeFormat).add(1, 'second').format(timeFormatRound)


                let canUsedMinute;
                let rangeMinute;

                if (tarifKamar.Time_Start > tarifKamar.Time_Finish) {
                    const dateTimeFinishRound = moment(finishTimeRounded, timeFormatRound).add(1, 'day').format(dateTimeFormat)
                    const searchTimeTemp = moment(timeNow, timeFormat).format(dateTimeFormat)
                    canUsedMinute = Math.round(moment.duration(moment(dateTimeFinishRound, dateTimeFormat).diff(moment(searchTimeTemp, dateTimeFormat))).asMinutes());
                    rangeMinute = moment.duration(moment(dateTimeFinishRound, dateTimeFormat).diff(moment(datetimeStart, dateTimeFormat))).asMinutes();
                } else {
                    canUsedMinute = moment.duration(moment(finishTimeRounded, timeFormatRound).diff(moment(timeNow, timeFormatRound))).asMinutes();
                    rangeMinute = moment.duration(moment(finishTimeRounded, timeFormatRound).diff(moment(startTimeRounded, timeFormatRound))).asMinutes();
                }
                let usageMinute = 0;
                if (canUsedMinute <= minute) {
                    usageMinute = canUsedMinute;
                } else {
                    usageMinute = minute;
                }
                minute = minute - usageMinute;
                timeNow = moment(tarifKamar.Time_Finish, timeFormat).add(1, 'second').format(timeFormat);

                const FeePerMinute = tarifKamar.Tarif / rangeMinute
                const feeRoom = usageMinute * FeePerMinute;

                roomPriceDetail.push(
                    {
                        room: tarifKamar.Nama_Kamar,
                        day: tarifKamar.Hari,
                        start_time: tarifKamar.Time_Start,
                        finish_time: tarifKamar.Time_Finish,
                        price: tarifKamar.Tarif,
                        price_per_minute: FeePerMinute,
                        used_minute: usageMinute,
                        room_total: feeRoom,
                        price_total: feeRoom
                    }
                )
            } while (minute > 0);

            resolve(roomPriceDetail);
        } catch (err) {
            reject(`RoomPriceCalculate ${err}`);
        }
    })
}