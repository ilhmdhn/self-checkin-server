const { DataTypes } = require('sequelize');
const sequelize = require('../util/sqlz'); // Pastikan Anda mengimpor atau membuat instance Sequelize sesuai dengan konfigurasi Anda.

const IHP_Sul_History = sequelize.define('IHP_Sul_History', {
  Summary: {
    type: DataTypes.STRING(16),
    allowNull: false,
  },
  DATE: {
    type: DataTypes.STRING(19),
    allowNull: true,
  },
  Shift: {
    type: DataTypes.STRING(1),
    allowNull: true,
  },
  Reception: {
    type: DataTypes.STRING(16),
    allowNull: true,
  },
  Member: {
    type: DataTypes.STRING(15),
    allowNull: true,
  },
  Nama: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  Kamar: {
    type: DataTypes.STRING(30),
    allowNull: true,
  },
  Total: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  Chtime: {
    type: DataTypes.STRING(19),
    allowNull: true,
  },
  Chusr: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  Printed: {
    type: DataTypes.STRING(1),
    allowNull: true,
  },
  Flag: {
    type: DataTypes.STRING(1),
    allowNull: true,
  },
  Posted: {
    type: DataTypes.STRING(1),
    allowNull: true,
  },
  Export: {
    type: DataTypes.STRING(1),
    allowNull: true,
  },
  INVOICE: {
    type: DataTypes.STRING(16),
    allowNull: true,
  },
  Date_Trans: {
    type: DataTypes.STRING(19),
    allowNull: true,
  },
  Bayar: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  Kembali: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  Number: {
    type: DataTypes.STRING(6),
    allowNull: true,
  },
  History: {
    type: DataTypes.SMALLINT,
    allowNull: true,
  },
  Change_Time: {
    type: DataTypes.STRING(19),
    allowNull: true,
  },
}, {
  tableName: 'IHP_Sul_History',
  timestamps: false, // Jika tabel Anda tidak memiliki kolom timestamp.
  freezeTableName: true,
});

IHP_IPAddress.removeAttribute('id');

module.exports = IHP_Sul_History;