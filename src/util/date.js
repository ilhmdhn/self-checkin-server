const moment = require('moment');
const sqlz = require('./sqlz');
const { Sequelize, DataTypes } = require('sequelize');
const { getDateTrans } = require('./WorkTime');
const getDate = 'GETDATE()'

const numberDate = () =>{
    return new Promise(async(resolve, reject)=>{
        try {
            const dateTrans = await getDateTrans()
            const mbl = await isMbl();
            const holiday = await isHoliday();
            if(mbl){
                resolve(8)
            }else if(holiday){
                resolve(9)
            }else{
                const dayName = await dateName(dateTrans);
                let dateNumber;
                switch(dayName) {
                    case 'Sunday':
                        dateNumber = 1;
                    break;
                    
                    case 'Monday':
                        dateNumber = 2;
                    break;
                    
                    case 'Tuesday':
                        dateNumber = 3;
                    break;
    
                    case 'Wednesday':
                        dateNumber = 4;
                    break;
                    
                    case 'Thursday':
                        dateNumber = 5;
                    break;
                    
                    case 'Friday':
                        dateNumber = 6;
                    break;
                    
                    case 'Saturday':
                        dateNumber = 7;
                    break;
                  }

                  resolve(dateNumber)
            }
        } catch (err) {
            reject(err);
        }
    });
}

const isHoliday = () =>{
    return new Promise(async(resolve, reject)=>{
        try {
            const isHoliday = await sqlz.query(`SELECT COUNT(*) as holiday FROM IHP_MBL WHERE DATEDIFF (d, CONVERT(varchar, ${getDate}, 111), CONVERT(varchar, Date_Libur, 111)) = 0`,{
                type: Sequelize.QueryTypes.SELECT,
                plain: true
            });
            if(isHoliday.holiday == 1){
                resolve(true);
            }else{
                resolve(false)
            }
        } catch (err) {
            resolve(err);
        }
    });
}

const isMbl = () =>{
    return new Promise(async(resolve, reject)=>{
        try {
            const isMbl = await sqlz.query(`SELECT COUNT(*) as mbl FROM IHP_MBL WHERE DATEDIFF (d, CONVERT(varchar, ${getDate}, 111), CONVERT(varchar, Date_Libur, 111)) = 1`,{
                type: Sequelize.QueryTypes.SELECT,
                plain: true
            });
            if(isMbl.mbl == 1){
                resolve(true);
            }else{
                resolve(false)
            }
        } catch (err) {
            resolve(false);
        }
    });
}

const dateName = (date) =>{
    return new Promise(async(resolve, reject)=>{
        try {
            const dateName = await sqlz.query(`SELECT DATENAME(weekday, '${date}') AS date_name`,{
                type: Sequelize.QueryTypes.SELECT,
                plain: true
            });
            resolve(dateName.date_name);
        } catch (err) {
            reject(err);
        }
    });
}

module.exports = {
    numberDate
}