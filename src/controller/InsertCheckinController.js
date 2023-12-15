const rcpTable = require('../model/IHP_Rcp');
const roomCheckinTable = require('../model/IHP_RoomCheckin');
const roomTable = require('../model/IHP_Room');
const rcpDetailRoomTable = require('../model/IHP_Rcp_DetailsRoom');
const ivcTable = require('../model/IHP_Ivc');
const promoRcpTable = require('../model/IHP_Promo_Rcp');
const solTable = require('../model/IHP_Sol');
const sodTable = require('../model/IHP_Sod');
const roomPriceTable = require('../model/IHP_Room_Price');
const sulTable = require('../model/IHP_Sul');
const sudTable = require('../model/IHP_Sud');
const selfCheckinOrderTable = require('../model/IHP_Self_Checkin_Order');
const vcrTable = require('../model/IHP_Vcr');
const uangVoucherTable = require('../model/IHP_UangVoucher');
const paymentGatewayTable = require('../model/IHP_Payment_Gateway');
const sodPromoTable = require('../model/IHP_Sod_Promo');
// const sulHistoryTable = require('../model/IHP_Sul_History');
// const sudHistoryTable = require('../model/IHP_Sud_History');
const ResponseFormat = require('../util/ResponseFormat');
const moment = require('moment');
const ipTable = require('../model/IHP_IPAddress');
const dgram = require('dgram');

const {
    generateRcpCode,
    generateIvcCode,
    generateSolCode,
    getUrutSod,
    generateSummaryCode
} = require('../util/GenerateCode');

const {
    getShift,
    getDateTrans,
    getDateTime
} = require('../util/WorkTime');

const {
    numberDate
} = require('../util/date');
const { printBill } = require('../util/Print');

const checkinPayLater = async (req, res) => {
/*
    try {
        const setLoc = new Set();
        const pax = req.body.pax;
        const roomCategory = req.body.room_category;
        const roomCode = req.body.room_code;
        const checkinDuration = req.body.checkin_duration;
        const roomPrice = req.body.room_price;
        const roomService = req.body.room_service;
        const roomTax = req.body.room_tax;
        const roomTotal = req.body.room_total;
        const roomPriceDetail = req.body.room_detail;
        const fnbPrice = req.body.fnb_price;
        const fnbService = req.body.fnb_service;
        const fnbTax = req.body.fnb_tax;
        const fnbTotal = req.body.fnb_total;
        const fnbDetail = req.body.fnb_detail;
        const memberName = req.body.member_name;
        let memberCode = req.body.member_code;

        const rcpCode = await generateRcpCode();
        const ivcCode = await generateIvcCode();
        const solCode = await generateSolCode();
        const dateTime = await getDateTime();
        const shift = await getShift()
        const dateTrans = await getDateTrans();
        const dateNumber = await numberDate();

        if (memberName == memberCode) {
            memberCode = memberCode + "-1"
        }

        let isMbl = 0;

        if (dateNumber == 9) {
            isMbl = 1;
        }

        const dateTimeFormated = moment(dateTime, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');
        const checkoutDatetime = moment(dateTimeFormated).add(checkinDuration, 'hour').format('YYYY-MM-DD HH:mm:ss');

        console.log(`rcpTable.create `)
        await rcpTable.create({
            Reception: rcpCode,
            DATE: moment(dateTimeFormated).format('DD/MM/YYYY HH:mm:ss'),
            SHIFT: `${shift}`,
            Member: memberCode,
            Nama: memberName,
            Kamar: roomCode,
            Checkin: dateTimeFormated,
            Jam_Sewa: checkinDuration,
            Menit_Sewa: 0,
            Checkout: checkoutDatetime,
            QM1: 0,
            QM2: 0,
            QM3: pax,
            QM4: 0,
            QF1: 0,
            QF2: 0,
            QF3: 0,
            QF4: 0,
            PAX: pax,
            Keterangan: '',
            Uang_Muka: 0,
            Id_Payment: 0,
            Uang_Voucher: 0,
            Chtime: moment(dateTimeFormated).format('DD/MM/YYYY HH:mm:ss'),
            Chusr: `SELF CHECKIN`,
            MBL: `${isMbl}`,
            Status: '1',
            Posted: '',
            Surcharge: 'N',
            Flag: '',
            Export: '',
            Reservation: '',
            Invoice: ivcCode,
            Summary: '',
            KMS: '',
            Date_Trans: dateTrans,
            Reception_Lama: '',
            Status_Promo: 1,
            FlagStep: '',
            Complete: '0'
        });

        console.log(`ivcTable.create `)
        await ivcTable.create({
            Invoice: ivcCode,
            DATE: moment(dateTimeFormated).format('DD/MM/YYYY HH:mm:ss'),
            Shift: `${shift}`,
            Reception: rcpCode,
            Member: memberCode,
            Nama: memberName,
            Kamar: roomCode,
            Sewa_Kamar: Math.round(roomPrice),
            Total_Extend: 0,
            Overpax: 0,
            Discount_Kamar: 0,
            Surcharge_Kamar: 0,
            Service_Kamar: Math.round(roomService),
            Tax_Kamar: Math.round(roomTax),
            Total_Kamar: Math.round(roomTotal),
            Charge_Penjualan: Math.round(fnbPrice),
            Total_Cancelation: 0,
            Discount_Penjualan: 0,
            Service_Penjualan: Math.round(fnbService),
            Tax_Penjualan: Math.round(fnbTax),
            Total_Penjualan: Math.round(fnbTotal),
            Charge_Lain: 0,
            Uang_Muka: 0,
            Uang_Voucher: 0,
            Total_All: Math.round(roomTotal + fnbTotal),
            Transfer: '',
            Status: '1',
            Chtime: moment(dateTimeFormated).format('DD/MM/YYYY HH:mm:ss'),
            Chusr: 'SELF CHECKIN',
            Printed: 0,
            Flag: '',
            Posted: '',
            Date_Trans: dateTrans,
            Jenis_Kamar: roomCategory
        });

        console.log(`roomCheckinTable.create `)
        await roomCheckinTable.create({
            Kamar: roomCode,
            Reception: rcpCode
        });

        console.log(`roomTable.update `)
        await roomTable.update({
            Reception: rcpCode,
            Nama_Tamu: memberName,
            Jumlah_Tamu: pax,
            Jam_Checkin: dateTimeFormated,
            Jam_Masuk: dateTimeFormated,
            Jam_Checkout: checkoutDatetime,
            Status_Checkin: 1,
            Nama_Tamu_Alias: memberName
        }, {
            where: {
                Kamar: roomCode,
                Jenis_Kamar: roomCategory
            }
        });

        if(roomPriceDetail.length > 0){
            for(let i = 0; i<roomPriceDetail.length; i++){
                console.log(`roomPriceTable.create `)
                await roomPriceTable.create({
                    reception: rcpCode,
                    room: roomCode,
                    day: dateNumber,
                    start_time: roomPriceDetail[i].start_time,
                    finish_time: roomPriceDetail[i].finish_time,
                    price: roomPriceDetail[i].price,
                    price_per_minute: roomPriceDetail[i].price_per_minute,
                    used_minute: roomPriceDetail[i].used_minute,
                    reduce_duration: '',
                    overpax: '',
                    overpax_price: '',
                    promo_percent: '',
                    room_total: roomPriceDetail[i].room_total,
                    promo_total: '',
                    price_total: roomPriceDetail[i].price_total,
                    is_extend:''
                });
            }
        }

        if (fnbDetail.length>0) {
            console.log(`solTable.create `)
            await solTable.create({
                SlipOrder: solCode,
                DATE: moment(dateTimeFormated).format('DD/MM/YYYY HH:mm:ss'),
                Shift: shift,
                Reception: rcpCode,
                Kamar: roomCode,
                Status: '1',
                Chtime: moment(dateTimeFormated).format('DD/MM/YYYY HH:mm:ss'),
                CHusr: 'SELF CHECKIN',
                POS: '192.168.1.19',
                Date_Trans: dateTrans,
                Mobile_POS: '',
            });

            for (let i = 0; i < fnbDetail.length; i++) {
                let latestUrut = await getUrutSod()
                setLoc.add(fnbDetail[i].location)
                console.log(`sodTable.create `)
                await sodTable.create({
                    SlipOrder: solCode,
                    Inventory: fnbDetail[i].id_local,
                    Nama: fnbDetail[i].item_name,
                    Price: fnbDetail[i].price,
                    Qty: fnbDetail[i].qty,
                    Qty_Terima: fnbDetail[i].qty,
                    Total: fnbDetail[i].price_total,
                    Status: '3',
                    Location: fnbDetail[i].location,
                    Printed: '2',
                    Note: fnbDetail[i].note,
                    CHUsr: 'SELF CHECKIN',
                    Tgl_Terima: dateTimeFormated,
                    Urut: latestUrut
                });
                if(fnbDetail[i].price_promo>0){
                    console.log(`sodPromoTable.create `)
                    let promoName = '';
                    if(!dataCheckin.promo_food_detail.promoFood){
                        promoName = 
                    }
                    await sodPromoTable.create({
                        SlipOrder: solCode,
                        Inventory: fnbDetail[i].id_local,
                        Promo_Food: dataCheckin.promo_food_detail.promoFood,
                        Harga_Promo: fnbDetail[i].price_promo,
                    });
                }
            }
        }
        console.log(`ipTable.findAll `)
        const ipVod = await ipTable.findAll({
            where: {
                Aplikasi: 'TIMER VOD2B'
            },
            raw: true
        });
        if (ipVod && (ipVod.length>0)) {
            const ipVod2 = ipVod[0].IP_Address;
            const portVod2 = ipVod[0].Server_Udp_Port;

            const socket = dgram.createSocket('udp4');
            socket.send('TIMER VOD2B', 0, 10, portVod2, ipVod2, (err, bytes) => {
                socket.close()
            });
        }

        for (const loc of setLoc) {
            if (loc == '2') {

                const socketKitchen = dgram.createSocket('udp4');
                console.log(`ipTable.findAll `)
                const ipKitchen = await ipTable.findAll({
                    where: {
                        Aplikasi: 'KITCHEN'
                    },
                    raw: true
                });
                if(ipKitchen.length>0){                    
                    socketKitchen.send('SLIP_ORDER_FRONT_OFFICE', 0, 23, ipKitchen[0].Server_Udp_Port, ipKitchen[0].IP_Address, (err, bytes) => {
                        socketKitchen.close();
                    });
                }
            }

            if (loc == '3') {
                const socketBar = dgram.createSocket('udp4');
                console.log(`ipTable.findAll `)
                const ipBar = await ipTable.findAll({
                    where: {
                        Aplikasi: 'BAR'
                    },
                    raw: true
                });
                if(ipBar.length>0){
                    socketBar.send('SLIP_ORDER_FRONT_OFFICE', 0, 23, ipBar[0].Server_Udp_Port, ipBar[0].IP_Address, (err, bytes) => {
                        socketBar.close();
                    })
                }
            }
        }
        printBill(rcpCode)
        res.send(ResponseFormat(true));
    } catch (err) {
        res.send(ResponseFormat(false, null, err.message));
    }
    */
}

const insertCheckin = (checkinData, paymentMethod, paymentChannel, transactionId, amount, fee) =>{
    return new Promise(async(resolve, reject)=>{
        try {
            const setLoc = new Set();
            const rcpCode = await generateRcpCode();
            const ivcCode = await generateIvcCode();
            const solCode = await generateSolCode();
            const sulCode = await generateSummaryCode();
            const dateTime = await getDateTime();
            const shift = await getShift()
            const dateTrans = await getDateTrans();
            const dateNumber = await numberDate();
            const dataCheckin = JSON.parse(checkinData);

            const memberCode = dataCheckin.member_code;
            const memberName = dataCheckin.member_name;
            const pax = dataCheckin.pax;
            const roomCategory = dataCheckin.room_category;
            const roomCode = dataCheckin.room_code;
            const checkinDuration = dataCheckin.checkin_duration;
            
            const roomPrice = dataCheckin.room_price;
            const roomPromo = dataCheckin.room_promo;
            const roomVoucher = dataCheckin.room_voucher;
            const roomService = dataCheckin.room_service;
            const roomTax = dataCheckin.room_tax;
            const roomTotal = dataCheckin.room_total;
            const fnbPrice = dataCheckin.fnb_price;
            const fnbPromo = dataCheckin.fnb_promo;
            const fnbVoucher = dataCheckin.fnb_voucher;
            const fnbService = dataCheckin.fnb_service;
            const fnbTax = dataCheckin.fnb_tax;
            const fnbTotal = dataCheckin.fnb_total;

            const roomPriceDetail = dataCheckin.room_detail;
            const promoRoomDetail = dataCheckin.promo_room_detail;
            const promoFoodDetail = dataCheckin.promo_food_detail;
            const voucherDetail = dataCheckin.voucher_detail;
            const fnbDetail = dataCheckin.fnb_detail;
            const paymentDetail = dataCheckin.payment;
            console.log('RENE GAK')
            if (memberName == memberCode) {
                if (memberName > 8) {
                    const truncatedName = memberName.substring(0, maxLength);
                    memberCode = truncatedName + "-1"
                } else {
                    memberCode = memberCode + "-1"
                }
            }
            
            let isMbl = 0;

            if (dateNumber == 9) {
                isMbl = 1;
            }

            const dateTimeFormated = moment(dateTime, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');
            const checkoutDatetime = moment(dateTimeFormated).add(checkinDuration, 'hour').format('YYYY-MM-DD HH:mm:ss');
            
            console.log(`rcpTable.create`)
            await rcpTable.create({
                Reception: rcpCode,
                DATE: moment(dateTimeFormated).format('DD/MM/YYYY HH:mm:ss'),
                SHIFT: `${shift}`,
                Member: memberCode,
                Nama: memberName,
                Kamar: roomCode,
                Checkin: dateTimeFormated,
                Jam_Sewa: checkinDuration,
                Menit_Sewa: 0,
                Checkout: checkoutDatetime,
                QM1: 0,
                QM2: 0,
                QM3: pax,
                QM4: 0,
                QF1: 0,
                QF2: 0,
                QF3: 0,
                QF4: 0,
                PAX: pax,
                Keterangan: '',
                Uang_Muka: 0,
                Id_Payment: 0,
                Uang_Voucher: 0,
                Chtime: moment(dateTimeFormated).format('DD/MM/YYYY HH:mm:ss'),
                Chusr: `SELF CHECKIN`,
                MBL: `${isMbl}`,
                Status: '1',
                Posted: '',
                Surcharge: 'N',
                Flag: '',
                Export: '',
                Reservation: '',
                Invoice: ivcCode,
                Summary: '',
                KMS: '',
                Date_Trans: dateTrans,
                Reception_Lama: '',
                Status_Promo: 1,
                FlagStep: '',
                Complete: '0'
            });

            console.log(`ivcTable.create`)
            await ivcTable.create({
                Invoice: ivcCode,
                DATE: moment(dateTimeFormated).format('DD/MM/YYYY HH:mm:ss'),
                Shift: `${shift}`,
                Reception: rcpCode,
                Member: memberCode,
                Nama: memberName,
                Kamar: roomCode,
                Sewa_Kamar: Math.round(roomPrice),
                Total_Extend: 0,
                Overpax: 0,
                Discount_Kamar: Math.round(roomPromo),
                Surcharge_Kamar: 0,
                Service_Kamar: Math.round(roomService),
                Tax_Kamar: Math.round(roomTax),
                Total_Kamar: Math.round(roomTotal),
                Charge_Penjualan: Math.round(fnbPrice),
                Total_Cancelation: 0,
                Discount_Penjualan: Math.round(fnbPromo),
                Service_Penjualan: Math.round(fnbService),
                Tax_Penjualan: Math.round(fnbTax),
                Total_Penjualan: Math.round(fnbTotal),
                Charge_Lain: 0,
                Uang_Muka: 0,
                Uang_Voucher: Math.round(roomVoucher + fnbVoucher),
                Total_All: Math.round(roomTotal + fnbTotal),
                Transfer: '',
                Status: '1',
                Chtime: moment(dateTimeFormated).format('DD/MM/YYYY HH:mm:ss'),
                Chusr: 'SELF CHECKIN',
                Printed: 0,
                Flag: '',
                Posted: '',
                Date_Trans: dateTrans,
                Jenis_Kamar: roomCategory
            });
    
            console.log(`roomCheckinTable.create`)
            await roomCheckinTable.create({
                Kamar: roomCode,
                Reception: rcpCode
            });

            console.log(`roomTable.update`)
            await roomTable.update({
                Reception: rcpCode,
                Nama_Tamu: memberName,
                Jumlah_Tamu: pax,
                Jam_Checkin: dateTimeFormated,
                Jam_Masuk: dateTimeFormated,
                Jam_Checkout: checkoutDatetime,
                Status_Checkin: 1,
                Nama_Tamu_Alias: memberName
            }, {
                where: {
                    Kamar: roomCode,
                    Jenis_Kamar: roomCategory
                }
            });

            if(roomPriceDetail.length > 0){
                for(let i = 0; i<roomPriceDetail.length; i++){
                    console.log(`roomPriceTable.create`)
                    await roomPriceTable.create({
                        reception: rcpCode,
                        room: roomCode,
                        day: dateNumber,
                        start_time: roomPriceDetail[i].start_time,
                        finish_time: roomPriceDetail[i].finish_time,
                        price: roomPriceDetail[i].price,
                        price_per_minute: roomPriceDetail[i].price_per_minute,
                        used_minute: roomPriceDetail[i].used_minute,
                        reduce_duration: '',
                        overpax: '',
                        overpax_price: '',
                        promo_percent: '',
                        room_total: roomPriceDetail[i].room_total,
                        promo_total: '',
                        price_total: roomPriceDetail[i].price_total,
                        is_extend:''
                    });
                }
            }

            if(promoRoomDetail){
                console.log(`promoRcpTable.create ROOM`)
                await promoRcpTable.create({
                    Reception: rcpCode,
                    Promo: promoFoodDetail.promoRoom,
                    Kamar: promoFoodDetail.room,
                    Hari: promoFoodDetail.hari,
                    Status_Promo: 1,
                    Date_Start: promoFoodDetail.dateStart,
                    Time_Start: promoFoodDetail.timeStart,
                    Date_Finish: promoFoodDetail.dateFinish,
                    Time_Finish: promoFoodDetail.timeFinish,
                    Diskon_Persen: promoFoodDetail.diskonPersen,
                    Diskon_Rp: promoFoodDetail.diskonRp,
                });
            }

            if(promoFoodDetail){
                console.log(`promoRcpTable.create FOOD`)
                await promoRcpTable.create({
                    Reception: rcpCode,
                    Promo: promoFoodDetail.promoFood,
                    Status_Promo: 2,
                    Syarat_Kamar: promoFoodDetail.syaratKamar,
                    Kamar: promoFoodDetail.kamar,
                    Syarat_Jenis_Kamar: promoFoodDetail.syaratJeniskamar,
                    Jenis_Kamar: promoFoodDetail.jenisKamar,
                    Syarat_Durasi: promoFoodDetail.syaratDurasi,
                    Durasi: promoFoodDetail.durasi,
                    Syarat_Hari: promoFoodDetail.syaratHari,
                    Hari: promoFoodDetail.hari,
                    Syarat_Jam: promoFoodDetail.syaratJam,
                    Date_Start: promoFoodDetail.dateStart,
                    Time_Start: promoFoodDetail.timeStart,
                    Date_Finish: promoFoodDetail.dateFinish,
                    Time_Finish: promoFoodDetail.timeFinish,
                    Syarat_Quantity: promoFoodDetail.syaratQuantity,
                    Quantity: promoFoodDetail.quantity,
                    Diskon_Persen: promoFoodDetail.diskonPersen,
                    Diskon_Rp: promoFoodDetail.diskonRp,
                    Syarat_Inventory: promoFoodDetail.syaratInventory,
                    Inventory: promoFoodDetail.inventory,
                });
            }

            if(voucherDetail){
                console.log(`vcrTable.create`)
                await vcrTable.create({
                    Voucher: voucherDetail.voucherCode,
                    DATE: moment(dateTimeFormated).format('DD/MM/YYYY HH:mm:ss'),
                    Expired: moment(dateTimeFormated).add(30, 'day').format('YYYY-MM-DD HH:mm:ss'),
                    Jenis_kamar: roomCategory,
                    Kamar: roomCode,
                    Jam_Free: 0,
                    Menit_Free: 0,
                    Nilai: Math.round(roomVoucher + fnbVoucher),
                    Status: 0,
                    CHtime: '',
                    CHUsr: 'SELF CHECKIN',
                    Reception: rcpCode
                });

                console.log(`uangVoucherTable.create`)
                await uangVoucherTable.create({
                    Reception: rcpCode,
                    Voucher: voucherDetail.voucherCode,
                    Pay_Value: Math.round(roomVoucher + fnbVoucher)
                });
            }

            if (fnbDetail.length>0) {
                console.log(`solTable.create`)
                await solTable.create({
                    SlipOrder: solCode,
                    DATE: moment(dateTimeFormated).format('DD/MM/YYYY HH:mm:ss'),
                    Shift: shift,
                    Reception: rcpCode,
                    Kamar: roomCode,
                    Status: '1',
                    Chtime: moment(dateTimeFormated).format('DD/MM/YYYY HH:mm:ss'),
                    CHusr: 'SELF CHECKIN',
                    POS: '192.168.1.19',
                    Date_Trans: dateTrans,
                    Mobile_POS: '',
                });

                
                for (let i = 0; i < fnbDetail.length; i++) {
                    const latestUrut = await getUrutSod()
                    setLoc.add(fnbDetail[i].location)
                    console.log(`sodTable.create`)
                    await sodTable.create({
                        SlipOrder: solCode,
                        Inventory: fnbDetail[i].id_local,
                        Nama: fnbDetail[i].item_name,
                        Price: fnbDetail[i].price,
                        Qty: fnbDetail[i].qty,
                        Qty_Terima: fnbDetail[i].qty,
                        Total: fnbDetail[i].price_total,
                        Status: '3',
                        Location: fnbDetail[i].location,
                        Printed: '2',
                        Note: fnbDetail[i].note,
                        CHUsr: 'SELF CHECKIN',
                        Tgl_Terima: dateTimeFormated,
                        Urut: latestUrut
                    });
                    
                    if(fnbDetail[i].price_promo>0){
                        console.log(`sodPromoTable.create `)

                        let promoName = '';
                        if(promoFoodDetail){
                            promoName = promoFoodDetail.promoFood
                        }else if(voucherDetail){
                            promoName = voucherDetail.voucherCode
                        }

                        await sodPromoTable.create({
                            SlipOrder: solCode,
                            Inventory: fnbDetail[i].id_local,
                            Promo_Food: dataCheckin.promo_food_detail.promoFood,
                            Harga_Promo: fnbDetail[i].price_promo,
                        });
                    }
                }
            }

            console.log(`sulTable.create`)
            await sulTable.create({
                Summary: sulCode,
                DATE: moment(dateTimeFormated).format('DD/MM/YYYY HH:mm:ss'),
                Shift: shift,
                Reception: rcpCode,
                Member: memberCode,
                Nama: memberName,
                Kamar: roomCode,
                Total: amount,
                Chtime: moment(dateTimeFormated).format('DD/MM/YYYY HH:mm:ss'),
                Chusr: 'SELF CHECKIN',
                Printed: '',
                Flag: '',
                Posted: '',
                Export: '',
                INVOICE: ivcCode,
                Date_Trans: dateTrans,
                Bayar: amount,
                Kembali: 0,
                Number: '',
                Flag_Notif: '',
                Flag_Pos_Invoice_Web: ''
            });

            console.log(`sudTable.create`)
            await sudTable.create({
                Summary: sulCode,
                ID_Payment: 99,
                Nama_Payment: 'PAYMENT GATEWAY',
                Member: memberCode,
                Nama: memberName,
                Input1: '',
                Input2: '',
                Input3: '',
                Input4: '',
                Pay_Value: amount,
                EDC_Machine: '',
                Status: 0,
                Flag: '',
            });

            console.log(`paymentGatewayTable.create`)
            await paymentGatewayTable.create({
                reception: rcpCode,
                method: paymentDetail.payment_method,
                channel: paymentDetail.payment_channel,
                fee: paymentDetail.fee
            })

            const ipVod = await ipTable.findAll({
                where: {
                    Aplikasi: 'TIMER VOD2B'
                },
                raw: true
            });

            if (ipVod && (ipVod.length>0)) {
                const ipVod2 = ipVod[0].IP_Address;
                const portVod2 = ipVod[0].Server_Udp_Port;
    
                const socket = dgram.createSocket('udp4');
                socket.send('TIMER VOD2B', 0, 10, portVod2, ipVod2, (err, bytes) => {
                    socket.close()
                });
            }
    
            for (const loc of setLoc) {
                if (loc == '2') {
    
                    const socketKitchen = dgram.createSocket('udp4');
                    const ipKitchen = await ipTable.findAll({
                        where: {
                            Aplikasi: 'KITCHEN'
                        },
                        raw: true
                    });
                    if(ipKitchen.length>0){                    
                        socketKitchen.send('SLIP_ORDER_FRONT_OFFICE', 0, 23, ipKitchen[0].Server_Udp_Port, ipKitchen[0].IP_Address, (err, bytes) => {
                            socketKitchen.close();
                        });
                    }
                }
    
                if (loc == '3') {
                    const socketBar = dgram.createSocket('udp4');
                    const ipBar = await ipTable.findAll({
                        where: {
                            Aplikasi: 'BAR'
                        },
                        raw: true
                    });
                    if(ipBar.length>0){
                        socketBar.send('SLIP_ORDER_FRONT_OFFICE', 0, 23, ipBar[0].Server_Udp_Port, ipBar[0].IP_Address, (err, bytes) => {
                            socketBar.close();
                        })
                    }
                }
            }     

            await selfCheckinOrderTable.create({
                reception: rcpCode,
                payment_method: paymentMethod,
                payment_channel: paymentChannel,
                id_transaction: transactionId,
                checkin_amount: amount,
                payment_fee: fee,
                checkin_data: JSON.stringify(dataCheckin),
            })
            resolve(true)
            printBill(rcpCode, dataCheckin)
        } catch (err) {
            console.error('Name:', err.name);       // Nama kesalahan (biasanya 'Error')
            console.error('Message:', err.message); // Pesan kesalahan yang disediakan
            console.error('Stack:', err.stack); 
            reject(err)
        }
    });
}

module.exports = {
    checkinPayLater,
    insertCheckin
}