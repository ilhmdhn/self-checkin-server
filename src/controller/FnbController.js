const axios = require('axios');
const getPreferences = require('../util/preferences');
const ResponseFormat = require('../util/ResponseFormat');

const getFnbCategory = async(req, res)=>{
    try {
        console.log('tesss')
        const apiResult = await axios.get(`https://adm.happypuppy.id/Api/fnb_category?outlet=${getPreferences().outlet}`);
        res.send(apiResult.data);
    } catch (err) {
        res.send(ResponseFormat(false, [], err));
    }
}

const getFnbPaging = async(req, res)=>{
    try {
        const page = req.query.page;
        const result = [];
        const apiResultTemp = await axios.get(`https://adm.happypuppy.id/Api/fnb_outlet?page=${page}&outlet=${getPreferences().outlet}`)
        const apiResult = apiResultTemp.data.data;
        if(apiResultTemp.data.state != true){
            throw apiResult.message;
        }

        for(let i = 0; i<apiResult.length; i++){
            
        }

    } catch (err) {
        
    }
}

module.exports = {
    getFnbCategory
}