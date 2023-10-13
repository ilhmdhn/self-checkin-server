const axios = require('axios');
const getPreferences = require('../util/preferences');
const ResponseFormat = require('../util/ResponseFormat');
const inventoryTable = require('../model/IHP_Inventory');

const getFnbCategory = async(req, res)=>{
    try {
        const apiResult = await axios.get(`https://adm.happypuppy.id/Api/fnb_category?outlet=${getPreferences().outlet}`);
        res.send(apiResult.data);
    } catch (err) {
        res.send(ResponseFormat(false, [], err));
    }
}

const getFnbPaging = async(req, res)=>{
    try {
        const page = req.query.page;
        const category = req.query.category;
        const search = req.query.search;
        const result = [];
        const url = `https://adm.happypuppy.id/Api/fnb_outlet?page=${page}&outlet=${getPreferences().outlet}&category=${category}&search=${search}`
        
        console.log(url);

        const apiResultTemp = await axios.get(`https://adm.happypuppy.id/Api/fnb_outlet?page=${page}&outlet=${getPreferences().outlet}&category=${category}&search=${search}`)
        const apiResult = apiResultTemp.data.data;
        
        console.log(apiResult)
        
        if(apiResultTemp.data.state != true){
            throw apiResult.message;
        }

        for(let i = 0; i<apiResult.length; i++){

            const item = await inventoryTable.findAll({
                where:{
                    InventoryID_Global: apiResult[i].id_global
                },
                raw: true
            });

            if(item){
                // console.log(item)
                item.forEach(element => {
                    result.push({
                        id_item: element.Inventory,
                        category_name: apiResult[i].category,
                        fnb_name: element.Nama,
                        image: apiResult[i].image,
                        id_global: element.InventoryID_Global,
                        price: element.Price,
                        is_service: element.Service,
                        is_tax: element.Pajak,
                        state: element.Status
                    }) 
                });
            }
        }

        res.send(ResponseFormat(true, result))
    } catch (err) {
        res.send(ResponseFormat(false, null, err.toString()))
    }
}

module.exports = {
    getFnbCategory,
    getFnbPaging
}