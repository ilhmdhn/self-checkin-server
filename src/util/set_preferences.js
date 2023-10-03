const Store = require('electron-store');

const setPrefenrences = (settingData) =>{
    const store  = new Store();
    store.set('IP_ADDRESS', settingData.ip),
    store.set('PORT', settingData.port),
    store.set('OUTLET', settingData.outlet),
    store.set('DB_NAME', settingData.db_name),
    store.set('DB_USER', settingData.db_user),
    store.set('DB_PASSWORD', settingData.db_pass),
    store.set('DB_SERVER', settingData.db_server)
}

module.exports = setPrefenrences;