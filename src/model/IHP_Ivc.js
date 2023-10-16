const { DataTypes } = require('sequelize');
const sql = require('../util/sqlz');

module.exports = sql.define('IHP_Ivc', {
  Invoice: {
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
    type: DataTypes.STRING(16),
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
  Sewa_Kamar: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  Total_Extend: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  Overpax: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  Discount_Kamar: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  Surcharge_Kamar: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  Service_Kamar: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  Tax_Kamar: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  Total_Kamar: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  Charge_Penjualan: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  Total_Cancelation: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  Discount_Penjualan: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  Service_Penjualan: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  Tax_Penjualan: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  Total_Penjualan: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  Charge_Lain: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  Uang_Muka: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  Uang_Voucher: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  Total_All: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  Transfer: {
    type: DataTypes.STRING(16),
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
  Chusr: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  Printed: {
    type: DataTypes.STRING(2),
    allowNull: true
  },
  Flag: {
    type: DataTypes.STRING(1),
    allowNull: true
  },
  Posted: {
    type: DataTypes.STRING(1),
    allowNull: true
  },
  Date_Trans: {
    type: DataTypes.STRING(19),
    allowNull: true
  },
  Jenis_Kamar: {
    type: DataTypes.STRING(30),
    allowNull: true
  },
  Flag_Notif: {
    type: DataTypes.STRING(1),
    allowNull: true
  },
  flag_receipt: {
    type: DataTypes.STRING(1),
    allowNull: true
  }
}, {
  tableName: 'IHP_Ivc',
  timestamps: false,
  freezeTableName: true
});