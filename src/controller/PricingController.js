const config2Table = require('../model/IHP_Config2');
const ResponseFormat = require('../util/ResponseFormat');

const getTaxService = async(req, res) =>{
    try {
        const taxService = await config2Table.findAll({
            where: {
                data: 1
            },
            raw: true
        });

        const result = {
            service_room: taxService[0].Service_Persen_Room,
            tax_room: taxService[0].Tax_Persen_Room,
            service_fnb: taxService[0].Service_Persen_Food,
            tax_fnb: taxService[0].Tax_Persen_Food,
        };

        res.send(ResponseFormat(true, result));
    } catch (err) {
        res.send(ResponseFormat(false, null, err.toString()));
    }
}

module.exports ={
    getTaxService
}