const { DataTypes } = require('sequelize');
const sql = require('../util/sqlz');

const IHP_Sol = sql.define('IHP_Sol', {
  SlipOrder: {
    type: DataTypes.STRING(16),
    allowNull: false,
    primaryKey: true
  },
  DATE: {
    type: DataTypes.STRING(19),
    allowNull: true
  },
  Shift: {
    type: DataTypes.STRING(1),
    allowNull: true
  },
  Reception: {
    type: DataTypes.STRING(16),
    allowNull: true
  },
  Kamar: {
    type: DataTypes.STRING(30),
    allowNull: true
  },
  Status: {
    type: DataTypes.STRING(1),
    allowNull: true
  },
  Chtime: {
    type: DataTypes.STRING(19),
    allowNull: true
  },
  CHusr: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  POS: {
    type: DataTypes.STRING(15),
    allowNull: true
  },
  Date_Trans: {
    type: DataTypes.STRING(19),
    allowNull: true
  },
  Mobile_POS: {
    type: DataTypes.STRING(50),
    allowNull: true
  }
}, {
  tableName: 'IHP_Sol',
  timestamps: false,
  freezeTableName: true
});

module.exports = IHP_Sol;