const { DataTypes } = require('sequelize');
const sql = require('../util/sqlz');


const IHP_RoomCheckin = sql.define('IHP_RoomCheckin', {
  Kamar: {
    type: DataTypes.STRING(30),
    allowNull: false,
    primaryKey: true
  },
  Reception: {
    type: DataTypes.STRING(16),
    allowNull: true
  }
}, {
  tableName: 'IHP_RoomCheckin',
  timestamps: false,
  freezeTableName: true
});
IHP_RoomCheckin.removeAttribute('id');

module.exports = IHP_RoomCheckin;