const configTigaTable = require('../model/IHP_Config3');
const { getDateTime } = require('./WorkTime');
const moment = require('moment');
const sqlz = require('../util/sqlz');
const { Sequelize, } = require('sequelize');

const generateRcpCode = () => {
    return new Promise(async(resolve, reject) => {
        try {
            const initialCode = await getInitialCode();
            const dateTimeNow = await getDateTime()
            const dateFormat = moment(dateTimeNow, 'YYYY-MM-DD HH:mm:ss').format('YYMMDD');
            let buildCode = initialCode.RCP + '-'+dateFormat;

            const latest = await sqlz.query(`SELECT TOP 1 Reception FROM IHP_Rcp WHERE Reception LIKE '${buildCode}%' ORDER BY Reception DESC`,{
                type: Sequelize.QueryTypes.SELECT,
                plain: true
            });

            if(!latest){
                buildCode = buildCode + '0001'
            }else{
                const latestNumber = parseInt(latest.Reception.slice(-4)) + 1
                const buildOrder = latestNumber.toString().padStart(4, 0);
                buildCode = buildCode + buildOrder;
            }
        
            resolve(buildCode)
        } catch (err) {
            reject(err);
        }
    });
}

const generateIvcCode = () =>{
    return new Promise(async(resolve, reject)=>{
        try {

            const initialCode = await getInitialCode();
            const dateTimeNow = await getDateTime()
            const dateFormat = moment(dateTimeNow, 'YYYY-MM-DD HH:mm:ss').format('YYMMDD');
            let buildCode = initialCode.IVC + '-'+dateFormat;
            
            const latest = await sqlz.query(`SELECT TOP 1 Invoice FROM IHP_Ivc WHERE Invoice LIKE '${buildCode}%' ORDER BY Invoice DESC`,{
                type: Sequelize.QueryTypes.SELECT,
                plain: true
            });

            if(!latest){
                buildCode = buildCode + '0001'
            }else{
                const latestNumber = parseInt(latest.Invoice.slice(-4)) + 1
                const buildOrder = latestNumber.toString().padStart(4, 0);
                buildCode = buildCode + buildOrder;
            }

            resolve(buildCode);
        } catch (err) {
            reject(err);
        }
    });
}

const generateSolCode = () =>{
    return new Promise(async(resolve, reject)=>{
        try {

            const initialCode = await getInitialCode();
            const dateTimeNow = await getDateTime()
            const dateFormat = moment(dateTimeNow, 'YYYY-MM-DD HH:mm:ss').format('YYMMDD');
            let buildCode = initialCode.SOL + '-'+dateFormat;

            const latest = await sqlz.query(`SELECT TOP 1 SlipOrder FROM IHP_Sol WHERE SlipOrder LIKE '${buildCode}%' ORDER BY SlipOrder DESC`,{
                type: Sequelize.QueryTypes.SELECT,
                plain: true
            });

            if(!latest){
                buildCode = buildCode + '0001'
            }else{
                const latestNumber = parseInt(latest.SlipOrder.slice(-5)) + 1
                const buildOrder = latestNumber.toString().padStart(5, 0);
                buildCode = buildCode + buildOrder;
            }
            resolve(buildCode);
        } catch (err) {
            reject(err);
        }
    });
}

const generateSummaryCode = () =>{
    return new Promise(async(resolve, reject)=>{
        try {
            const initialCode = await getInitialCode();
            const dateTimeNow = await getDateTime()
            const dateFormat = moment(dateTimeNow, 'YYYY-MM-DD HH:mm:ss').format('YYMMDD');
            let buildCode = initialCode.SUM + '-'+dateFormat;

            const latest = await sqlz.query(`SELECT TOP 1 Summary FROM IHP_Sul WHERE Summary LIKE '${buildCode}%' ORDER BY SUmmary DESC`,{
                type: Sequelize.QueryTypes.SELECT,
                plain: true
            });

            if(!latest){
                buildCode = buildCode + '0001'
            }else{
                const latestNumber = parseInt(latest.Summary.slice(-5)) + 1
                const buildOrder = latestNumber.toString().padStart(5, 0);
                buildCode = buildCode + buildOrder;
            }
            resolve(buildCode)
        } catch (err) {
            reject(err);
        }
    });
}

const getUrutSod = () =>{
    return new Promise(async(resolve, reject)=>{
        try {
            const initialCode = await getInitialCode();
            const dateTimeNow = await getDateTime()
            const dateFormat = moment(dateTimeNow, 'YYYY-MM-DD HH:mm:ss').format('YYMMDD');
            let buildCode = initialCode.SOL + '-'+dateFormat;
            let urut = 1;

            const latest = await sqlz.query(`SELECT TOP 1 Urut FROM IHP_Sol WHERE SlipOrder LIKE '${buildCode}%' ORDER BY SlipOrder DESC`,{
                type: Sequelize.QueryTypes.SELECT,
                plain: true
            });

            if(latest){
                urut = latest.Urut + 1
            }

            resolve(urut);
        } catch (err) {
            resolve(0)
        }
    });
}

const getInitialCode = () =>{
    return new Promise(async(resolve, reject)=>{
        try {
            const initial = await configTigaTable.findAll({
                where:{
                    Data: 1
                },
                raw: true
            });
            resolve(initial[0]);
        } catch (err) {
            reject(err);
        }
    });
}

module.exports = {
    generateRcpCode,
    generateIvcCode,
    generateSolCode,
    getUrutSod,
    generateSummaryCode
}