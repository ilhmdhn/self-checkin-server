const Sequelize = require('sequelize');
const preferences = require('./preferences');
module.exports = new Sequelize(preferences().databaseName, preferences().databaseUser, preferences().databasePassword, {
    host: preferences().databaseServer,
    dialect:  'mssql',
    logging: false,
    dialectOptions:{
        datefirst: 1
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    define: {
        timestamps: false // Opsional: Ini akan menonaktifkan pengaturan timestamp default Sequelize
    },
    // options: {
    //     enableArithAbort: true // Atau false, sesuai kebutuhan Anda
    // }
});