const Store = require('electron-store');

const getPreferences = () => {
        const storeData = new Store();
        return {
                serverIp: storeData.get('IP_ADDRESS'),
                port: storeData.get('PORT'),
                outlet: storeData.get('OUTLET'),
                databaseName: storeData.get('DB_NAME'),
                databaseUser: storeData.get('DB_USER'),
                databasePassword: storeData.get('DB_PASSWORD'),
                databaseServer: storeData.get('DB_SERVER')
        }
}
module.exports = getPreferences;