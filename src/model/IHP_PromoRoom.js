const { DataTypes } = require('sequelize');
const sequelize = require('../util/sqlz'); // Pastikan Anda mengimpor atau membuat instance Sequelize sesuai dengan konfigurasi Anda.

const IHP_PromoRoom = sequelize.define('IHP_PromoRoom', {
  Promo_Room: {
    type: DataTypes.STRING(30),
    allowNull: false,
    primaryKey: true,
  },
  Hari: {
    type: DataTypes.SMALLINT,
    allowNull: true,
  },
  Room: {
    type: DataTypes.STRING(30),
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
  Diskon_Persen: {
    type: DataTypes.FLOAT,
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
  CHUsr: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  Export: {
    type: DataTypes.STRING(1),
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
  Id_Promo_Group: {
    type: DataTypes.SMALLINT,
    allowNull: true,
  },
}, {
  tableName: 'IHP_PromoRoom',
  timestamps: false, // Jika tabel Anda tidak memiliki kolom timestamp.
});

module.exports = IHP_PromoRoom;