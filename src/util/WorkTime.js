const { Sequelize } = require('sequelize');
const configTable = require('../model/IHP_Config');
const moment = require('moment');
const sqlz = require('./sqlz');

const getShift = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const serverDateTime = await getDateTime()
            const dateTrans = await getDateTrans()
            
            console.log('DATE TRANS ', dateTrans)

            const config = await configTable.findOne({
                where: {
                    DATA: 1
                },
                raw: true
            });
            const timeNow = moment(serverDateTime, 'YYYY-MM-DD HH:mm:ss').format('HH:mm:ss');
            const openTime = moment(config.Worktime_Start, 'HH:mm:ss').format('HH:mm:ss');
            const changeShift = moment(config.Shifttime, 'HH:mm:ss').format('HH:mm:ss');
            /*
            const finishNextDay = config.Workdate_Finish;
            const closeTime = moment(config.Worktime_Finish, 'HH:mm:ss').format('HH:mm:ss');
            if(timeNow > openTime && timeNow < changeShift){
                resolve(1)
            }else if(finishNextDay == 1 && timeNow < closeTime){
                resolve(2)
            }else if(finishNextDay == 0 && timeNow >= changeShift && timeNow <= closeTime){
                resolve(2)
            }else{
                resolve(2)
            }
*/
        if(timeNow >= openTime && timeNow < changeShift){
            resolve(1)
        }else{
            resolve(2)
        }
        } catch (err) {
            reject(err);
        }
    });
}

const getDateTrans = () =>{
    return new Promise(async(resolve, reject)=>{
        try {
            const serverDateTime = await getDateTime()
            
            const config = await configTable.findOne({
                where: {
                    DATA: 1
                },
                raw: true
            });
            
            const timeNow = moment(serverDateTime, 'YYYY-MM-DD HH:mm:ss').format('HH:mm:ss');
            const openTime = moment(config.Worktime_Start, 'HH:mm:ss').format('HH:mm:ss');
            const closeTime = moment(config.Worktime_Finish, 'HH:mm:ss').format('HH:mm:ss');
            const changeShift = moment(config.Shifttime, 'HH:mm:ss').format('HH:mm:ss');
            const finishNextDay = config.Workdate_Finish;
            console.log()
            if(timeNow >= openTime && timeNow <= '25:59:59'){
                resolve(serverDateTime)
            }else{
                const parseDateTime = moment(serverDateTime, 'YYYY-MM-DD HH:mm:ss');
                const subtractedDate = parseDateTime.subtract(1, 'days');                
                const formattedDate = subtractedDate.format('YYYY-MM-DD HH:mm:ss');
               resolve(formattedDate)
            }
        } catch (err) {
            reject(err)
        }
    })
}

const getDateTime = () => {
    return new Promise(async(resolve, reject) => {
        try {
            const time = await sqlz.query('SELECT CONVERT(VARCHAR, GETDATE(), 120) as time', {
                type: Sequelize.QueryTypes.SELECT,
                plain: true
            });
            resolve(time.time);
        } catch (err) {
            reject(err);
        }
    })
}

module.exports = {
    getShift,
    getDateTrans,
    getDateTime
}