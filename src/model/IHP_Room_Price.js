const { DataTypes } = require('sequelize');
const sql = require('../util/sqlz');

const IHP_Room_Price = sql.define('IHP_Room_Price',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
    reception: {
        type: DataTypes.STRING(16),
        allowNull: false
    },
    room: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    day: {
        type: DataTypes.SMALLINT,
        allowNull: false
    },
    start_time: {
        type: DataTypes.STRING(8),
        allowNull: true
    },
    finish_time: {
        type: DataTypes.STRING(8),
        allowNull: true
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0
    },
    price_per_minute: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0
    },
    used_minute: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 0
    },
    reduce_duration: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 0
    },
    overpax: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0
    },
    overpax_price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0
    },
    promo_percent: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 0
    },
    room_total: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0
    },
    promo_total: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0
    },
    price_total: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0
    },
    is_extend: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 0
    }
},{
    tableName: 'IHP_Room_Price',
    timestamps: false,
    freezeTableName: true
});

module.exports = IHP_Room_Price;