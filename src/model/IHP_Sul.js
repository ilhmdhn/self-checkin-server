const { DataTypes } = require('sequelize');
const sql = require('../util/sqlz');

const IHP_Sul = sql.define('IHP_Sul', {
  Summary: {
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
  Member: {
    type: DataTypes.STRING(15),
    allowNull: true
  },
  Nama: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  Kamar: {
    type: DataTypes.STRING(30),
    allowNull: true
  },
  Total: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  Chtime: {
    type: DataTypes.STRING(19),
    allowNull: true
  },
  Chusr: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  Printed: {
    type: DataTypes.STRING(2),
    allowNull: false
  },
  Flag: {
    type: DataTypes.STRING(1),
    allowNull: true
  },
  Posted: {
    type: DataTypes.STRING(1),
    allowNull: true
  },
  Export: {
    type: DataTypes.STRING(1),
    allowNull: true
  },
  INVOICE: {
    type: DataTypes.STRING(16),
    allowNull: true
  },
  Date_Trans: {
    type: DataTypes.STRING(19),
    allowNull: true
  },
  Bayar: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  Kembali: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  Number: {
    type: DataTypes.STRING(6),
    allowNull: true
  },
  Flag_Notif: {
    type: DataTypes.STRING(1),
    allowNull: true
  },
  Flag_Pos_Invoice_Web: {
    type: DataTypes.STRING(1),
    allowNull: true
  }
}, {
  tableName: 'IHP_Sul',
  timestamps: false,
  freezeTableName: true
});

module.exports = IHP_Sul;
