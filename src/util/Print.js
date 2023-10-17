const escpos = require('escpos');
escpos.USB = require('escpos-usb');
const toRupiah = require('@develoka/angka-rupiah-js');
const moment = require('moment');

const configSatuTable = require('../model/IHP_Config');
const rcpTable = require('../model/IHP_Rcp');
const ivcTable = require('../model/IHP_Ivc');
const solTable = require('../model/IHP_Sol');
const sodTable = require('../model/IHP_Sod');

const printBill = async (rcpCode) => {
    try {
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
                Reception:rcpCode
            },
            raw: true
        })

        if(solData){
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
                .text('')
                .text('')
                .text(configData.Nama_Outlet.toUpperCase())
                .text(configData.Alamat_Outlet)
                .text(configData.Alamat_Outlet2)
                .text(configData.Kota)
                .text(configData.Tlp1)
                .text('')
                .text('TAGIHAN')
                .align('lt')
                .text('')
                .text(`Ruangan : ${rcpData.Kamar}`)
                .text(`Nama    : ${rcpData.Nama}`)
                .text(`Tanggal : ${rcpData.DATE}`)
                .text('')
                .text('Sewa Ruangan')
                .tableCustom([
                    { text: `${checkinTime.slice(11, 16)} - ${checkoutTime.slice(11, 16)}`, align: "LEFT" },
                    { text: `${toRupiah(ivcData.Sewa_Kamar, { symbol: null, floatingPoint: 0 })}`, align: "RIGHT" },
                ]);
                printer.text('')
                if(listFnB){
                    printer.text('Rincian Penjualan')
                    printer.text('')
                        listFnB.forEach(element =>{
                            printer.text(element.itemName)
                            printer.tableCustom([
                                { text: `  ${element.qty} x ${toRupiah(element.price, { symbol: null, floatingPoint: 0 })}`, align: "LEFT" },
                                { text: toRupiah(element.total, { symbol: null, floatingPoint: 0 }), align: "RIGHT" },
                            ]);
                        });
                }
                printer.close()
        });
        console.log(`Bar ngeprint`)
    } catch (err) {
        console.log(`ERROR PRINT ${err}`)
        return err;
    }
}

module.exports = {
    printBill
}