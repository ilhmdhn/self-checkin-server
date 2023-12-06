const { DataTypes } = require('sequelize');
const sequelize = require('../util/sqlz'); // Pastikan Anda mengimpor atau membuat instance Sequelize sesuai dengan konfigurasi Anda.

const IHP_Vcr = sequelize.define('IHP_Vcr', {
  Voucher: {
    type: DataTypes.STRING(20),
    allowNull: false,
    primaryKey: true,
  },
  DATE: {
    type: DataTypes.STRING(19),
    allowNull: true,
  },
  Expired: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  Jenis_kamar: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  Kamar: {
    type: DataTypes.STRING(30),
    allowNull: true,
  },
  Jam_Free: {
    type: DataTypes.SMALLINT,
    allowNull: true,
  },
  Menit_Free: {
    type: DataTypes.SMALLINT,
    allowNull: true,
  },
  Date_Start: {
    type: DataTypes.SMALLINT,
    allowNull: true,
  },
  Time_Start: {
    type: DataTypes.STRING(8),
    allowNull: true,
  },
  Date_Finish: {
    type: DataTypes.SMALLINT,
    allowNull: true,
  },
  Time_Finish: {
    type: DataTypes.STRING(8),
    allowNull: true,
  },
  Nilai: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  Jenis_Voucher: {
    type: DataTypes.SMALLINT,
    allowNull: true,
  },
  Status: {
    type: DataTypes.STRING(1),
    allowNull: true,
  },
  CHtime: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  CHUsr: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  Export: {
    type: DataTypes.STRING(1),
    allowNull: true,
  },
  Reception: {
    type: DataTypes.STRING(19),
    allowNull: true,
  },
}, {
  tableName: 'IHP_Vcr',
  timestamps: false, // Jika tabel Anda tidak memiliki kolom timestamp.
  freezeTableName: true
});

module.exports = IHP_Vcr;