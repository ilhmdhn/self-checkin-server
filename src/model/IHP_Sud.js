const { DataTypes } = require('sequelize');
const sql = require('../util/sqlz');

const IHP_Sud = sql.define('IHP_Sud', {
  Summary: {
    type: DataTypes.STRING(16),
    allowNull: false
  },
  ID_Payment: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  Nama_Payment: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  Member: {
    type: DataTypes.STRING(15),
    allowNull: true
  },
  Nama: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  Input1: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  Input2: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  Input3: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  Input4: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  Pay_Value: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  EDC_Machine: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  Status: {
    type: DataTypes.STRING(1),
    allowNull: true
  },
  Flag: {
    type: DataTypes.STRING(1),
    allowNull: true
  }
}, {
  tableName: 'IHP_Sud',
  timestamps: false,
  freezeTableName: true
});

IHP_Sud.removeAttribute('id');

module.exports = IHP_Sud;
