const { DataTypes } = require('sequelize');
const sequelize = require('../util/sqlz'); // Pastikan Anda mengimpor atau membuat instance Sequelize sesuai dengan konfigurasi Anda.

const IHP_PromoFood = sequelize.define('IHP_PromoFood', {
  Promo_Food: {
    type: DataTypes.STRING(30),
    allowNull: false,
    primaryKey: true,
  },
  Syarat_Kamar: {
    type: DataTypes.SMALLINT,
    allowNull: true,
  },
  Kamar: {
    type: DataTypes.STRING(30),
    allowNull: true,
  },
  Syarat_Jenis_kamar: {
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
  Syarat_Inventory: {
    type: DataTypes.SMALLINT,
    allowNull: true,
  },
  Inventory: {
    type: DataTypes.STRING(20),
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
  Sign_Inventory: {
    type: DataTypes.SMALLINT,
    allowNull: true,
  },
  Sign_Diskon_Persen: {
    type: DataTypes.SMALLINT,
    allowNull: true,
  },
  Diskon_Persen: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  Sign_Diskon_Rp: {
    type: DataTypes.SMALLINT,
    allowNull: true,
  },
  Diskon_Rp: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  CHTime: {
    type: DataTypes.STRING(19),
    allowNull: true,
  },
  CHusr: {
    type: DataTypes.STRING(30),
    allowNull: true,
  },
  Khusus: {
    type: DataTypes.SMALLINT,
    allowNull: true,
  },
  Status: {
    type: DataTypes.SMALLINT,
    allowNull: true,
  },
  Global: {
    type: DataTypes.SMALLINT,
    allowNull: true,
  },
  Id_Promo_Group: {
    type: DataTypes.SMALLINT,
    allowNull: true,
  },
}, {
  tableName: 'IHP_PromoFood',
  timestamps: false, // Jika tabel Anda tidak memiliki kolom timestamp.
});

module.exports = IHP_PromoFood;