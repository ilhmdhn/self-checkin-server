const { DataTypes } = require('sequelize');
const sql = require('../util/sqlz');


const IHP_Sod_Promo = sql.define('IHP_Sod_Promo', {
  SlipOrder: {
    type: DataTypes.STRING(16),
    allowNull: false,
    primaryKey: true
  },
  Inventory: {
    type: DataTypes.STRING(20),
    allowNull: false,
    primaryKey: true
  },
  Promo_Food: {
    type: DataTypes.STRING(30),
    allowNull: false,
    primaryKey: true
  },
  Harga_Promo: {
    type: DataTypes.FLOAT,
    allowNull: true
  }
}, {
  tableName: 'IHP_Sod_Promo',
  timestamps: false,
  freezeTableName: true
});

module.exports = IHP_Sod_Promo;
