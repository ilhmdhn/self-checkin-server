const { DataTypes } = require('sequelize');
const sequelize = require('../util/sqlz'); // Pastikan Anda mengimpor atau membuat instance Sequelize sesuai dengan konfigurasi Anda.

const IHP_Promo_Rcp = sequelize.define('IHP_Promo_Rcp', {
  Reception: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  Promo: {
    type: DataTypes.STRING(30),
    allowNull: true,
  },
  Start_Promo: {
    type: DataTypes.STRING(19),
    allowNull: true,
  },
  End_Promo: {
    type: DataTypes.STRING(19),
    allowNull: true,
  },
  Status_Promo: {
    type: DataTypes.SMALLINT,
    allowNull: true,
  },
  Syarat_Kamar: {
    type: DataTypes.SMALLINT,
    allowNull: true,
  },
  Kamar: {
    type: DataTypes.STRING(30),
    allowNull: true,
  },
  Syarat_Jenis_Kamar: {
    type: DataTypes.SMALLINT,
    allowNull: true,
  },
  Jenis_Kamar: {
    type: DataTypes.STRING(30),
    allowNull: true,
  },
  Syarat_Durasi: {
    type: DataTypes.SMALLINT,
    allowNull: true,
  },
  Durasi: {
    type: DataTypes.SMALLINT,
    allowNull: true,
  },
  Syarat_Hari: {
    type: DataTypes.SMALLINT,
    allowNull: true,
  },
  Hari: {
    type: DataTypes.SMALLINT,
    allowNull: true,
  },
  Syarat_Jam: {
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
  Syarat_Quantity: {
    type: DataTypes.SMALLINT,
    allowNull: true,
  },
  Quantity: {
    type: DataTypes.SMALLINT,
    allowNull: true,
  },
  Diskon_Persen: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  Diskon_Rp: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  Syarat_Inventory: {
    type: DataTypes.SMALLINT,
    allowNull: true,
  },
  Inventory: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  Sign_Inventory: {
    type: DataTypes.SMALLINT,
    allowNull: true,
  },
  Sign_Diskon_Persen: {
    type: DataTypes.SMALLINT,
    allowNull: true,
  },
  Sign_Diskon_Rp: {
    type: DataTypes.SMALLINT,
    allowNull: true,
  },
  FlagExtend: {
    type: DataTypes.SMALLINT,
    allowNull: true,
  },
}, {
  tableName: 'IHP_Promo_Rcp',
  timestamps: false, // Jika tabel Anda tidak memiliki kolom timestamp.
  freezeTableName: true
});

IHP_Promo_Rcp.removeAttribute('id');

module.exports = IHP_Promo_Rcp;