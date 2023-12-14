const escpos = require('escpos');
escpos.USB = require('escpos-usb');
const toRupiah = require('@develoka/angka-rupiah-js');
const moment = require('moment');

const configSatuTable = require('../model/IHP_Config');
const rcpTable = require('../model/IHP_Rcp');
const ivcTable = require('../model/IHP_Ivc');
const solTable = require('../model/IHP_Sol');
const sodTable = require('../model/IHP_Sod');
const selfCheckinOrderTable = require('../model/IHP_Self_Checkin_Order');


const printBill = async (rcpCode, dataCheckin) => {
    try {
        // rcpCode = 'SOL-23110200002'
        const device = new escpos.USB();
        const options = { encoding: "GB18030", width: 48 }
        const printer = new escpos.Printer(device, options);
        const listFnB = [];
        

        const configSatuData = await configSatuTable.findAll({
            where: {
                DATA: 1
            },
            raw: true
        });
        const configData = configSatuData[0];

        const rcpDataTemp = await rcpTable.findAll({
            where: {
                Reception: rcpCode
            },
            raw: true
        })

        const ivcDataTemp = await ivcTable.findAll({
            where: {
                Reception: rcpCode
            },
            raw: true
        })

        const solData = await solTable.findAll({
            where:{
                Reception :rcpCode
            },
            raw: true
        });

        const selfCheckinDataTemp = await selfCheckinOrderTable.findAll({
            where:{
                reception: rcpCode
            },
            raw: true
        })

        const selfCheckinData = selfCheckinDataTemp[0];

        if(solData.length>0){
            const sodData = await sodTable.findAll({
                where:{
                    SlipOrder: solData[0].SlipOrder
                },
                raw: true
            })

            sodData.forEach(element => {
                listFnB.push({
                    itemName: element.Nama,
                    price: element.Price,
                    qty: element.Qty,
                    total: element.Total
                });
            });
        }

        const rcpData = rcpDataTemp[0];
        const ivcData = ivcDataTemp[0];

        const checkinTime = moment.utc(rcpData.Checkin, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');
        const checkoutTime = moment.utc(rcpData.Checkout, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');

        device.open((err) => {
            if (err) {
                throw err;
            }
            printer
                .font('a')
                .align('ct')
                .style('n')
                .size(0.01, 0.01)
                .newLine()
                .newLine()
                .text(configData.Nama_Outlet.toUpperCase())
                .text(configData.Alamat_Outlet)
                .text(configData.Alamat_Outlet2)
                .text(configData.Kota)
                .text(configData.Tlp1)
                .newLine()
                .style('b')
                .text('INVOICE')
                .style('n')
                .align('lt')
                .newLine()
                .text(`Ruangan : ${rcpData.Kamar}`)
                .text(`Nama    : ${rcpData.Nama}`)
                .text(`Tanggal : ${rcpData.DATE}`)
                .newLine()
                .text('Sewa Ruangan')
                .tableCustom([
                    { text: `${checkinTime.slice(11, 16)} - ${checkoutTime.slice(11, 16)}`, align: "LEFT" },
                    { text: `${toRupiah(ivcData.Sewa_Kamar, { symbol: null, floatingPoint: 0 })}`, align: "RIGHT" },
                ]);
                printer.newLine()
                if(listFnB.length>0){
                    printer.text('Rincian Penjualan')
                    printer.newLine()
                        listFnB.forEach(element =>{
                            printer.text(element.itemName)
                            printer.tableCustom([
                                { text: `  ${element.qty} x ${toRupiah(element.price, { symbol: null, floatingPoint: 0 })}`, align: "LEFT" },
                                { text: toRupiah(element.total, { symbol: null, floatingPoint: 0 }), align: "RIGHT" },
                            ]);
                        });
                }
                printer
                .drawLine()
                .tableCustom([
                    { text: `Jumlah Ruangan`, align: "LEFT" },
                    { text: `${toRupiah(ivcData.Total_Kamar, { symbol: null, floatingPoint: 0 })}`, align: "RIGHT" },
                ]);
                if(listFnB.length>0){
                   printer.tableCustom([
                        { text: `Jumlah Penjualan`, align: "LEFT" },
                        { text: `${toRupiah(ivcData.Total_Penjualan, { symbol: null, floatingPoint: 0 })}`, align: "RIGHT" },
                    ]);
                }
                printer.drawLine()
                printer.tableCustom([
                    { text: ``, align: "LEFT" },
                    { text: `Jumlah`, align: "RIGHT" },
                    { text: `${toRupiah(ivcData.Total_Kamar + ivcData.Total_Penjualan, { symbol: null, floatingPoint: 0 })}`, align: "RIGHT" },
                ]);
                printer.tableCustom([
                    { text: ``, align: "LEFT" },
                    { text: `Service`, align: "RIGHT" },
                    { text: `${toRupiah(ivcData.Service_Kamar + ivcData.Service_Penjualan, { symbol: null, floatingPoint: 0 })}`, align: "RIGHT" },
                ]);
                printer.tableCustom([
                    { text: ``, align: "LEFT" },
                    { text: `Pajak`, align: "RIGHT" },
                    { text: `${toRupiah(ivcData.Tax_Kamar + ivcData.Tax_Penjualan, { symbol: null, floatingPoint: 0 })}`, align: "RIGHT" },
                ]);
                printer.tableCustom([
                    { text: ``, align: "LEFT" },
                    { text: ``, align: "RIGHT" },
                    { text: `-----------`, align: "RIGHT" },
                ]);
                printer.tableCustom([
                    { text: ``, align: "LEFT" },
                    { text: ``, align: "RIGHT" },
                    { text: `${toRupiah(ivcData.Total_All, { symbol: null, floatingPoint: 0 })}`, align: "RIGHT" },
                ]);
                printer.newLine()
                printer.tableCustom([
                    { text: ``, align: "LEFT" },
                    { text: `Penanganan ${selfCheckinData.payment_channel}`, align: "RIGHT" },
                    { text: `${toRupiah(selfCheckinData.payment_fee, { symbol: null, floatingPoint: 0 })}`, align: "RIGHT" },
                ]);
                printer.tableCustom([
                    { text: ``, align: "LEFT" },
                    { text: ``, align: "RIGHT" },
                    { text: `-----------`, align: "RIGHT" },
                ]);
                printer.tableCustom([
                    { text: ``, align: "LEFT" },
                    { text: `TOTAL`, align: "RIGHT" },
                    { text: `${toRupiah(selfCheckinData.payment_fee + ivcData.Total_All, { symbol: null, floatingPoint: 0 })}`, align: "RIGHT" },
                ]);
                    // .size(1,0.1)
                    // .align('ct')
                    // .style('b')
                    // .text(`${toRupiah(ivcData.Total_All, {floatingPoint: 0 })}`)
                printer.newLine()
                    .newLine()
                    .newLine()
                    .close()
        });
    } catch (err) {
        return err;
    }
}

module.exports = {
    printBill
}