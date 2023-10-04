const { DataTypes } = require('sequelize');
const sql = require('../util/sqlz');

module.exports = sql.define('IHP_Room', {
  Kamar: {
    type: DataTypes.STRING(30),
    allowNull: false,
    primaryKey: true
  },
  Jenis_Kamar: {
    type: DataTypes.STRING(30),
    allowNull: true
  },
  Kapasitas: {
    type: DataTypes.SMALLINT,
    allowNull: true
  },
  Reception: {
    type: DataTypes.STRING(15),
    allowNull: true
  },
  Nama_Tamu: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  Jumlah_Tamu: {
    type: DataTypes.SMALLINT,
    allowNull: true
  },
  Kondisi_Kamar: {
    type: DataTypes.STRING(1),
    allowNull: true
  },
  CHTIME: {
    type: DataTypes.DATE,
    allowNull: true
  },
  CHUsr: {
    type: DataTypes.STRING(30),
    allowNull: true
  },
  Status_Ready: {
    type: DataTypes.SMALLINT,
    allowNull: true
  },
  Status_Checkin: {
    type: DataTypes.SMALLINT,
    allowNull: true
  },
  Status_10: {
    type: DataTypes.SMALLINT,
    allowNull: true
  },
  Status_Reservation: {
    type: DataTypes.SMALLINT,
    allowNull: true
  },
  Status_CheckOut: {
    type: DataTypes.SMALLINT,
    allowNull: true
  },
  Status_Order: {
    type: DataTypes.SMALLINT,
    allowNull: true
  },
  IP_Address: {
    type: DataTypes.STRING(15),
    allowNull: true
  },
  Nama_Computer: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  Keterangan_Connect: {
    type: DataTypes.SMALLINT,
    allowNull: true
  },
  Service_Kamar: {
    type: DataTypes.SMALLINT,
    allowNull: true
  },
  Kamar_Ready: {
    type: DataTypes.SMALLINT,
    allowNull: true
  },
  Keterangan_Tamu: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  Keterangan: {
    type: DataTypes.SMALLINT,
    allowNull: true
  },
  Status_Masuk: {
    type: DataTypes.SMALLINT,
    allowNull: true
  },
  Status_Extend: {
    type: DataTypes.SMALLINT,
    allowNull: true
  },
  Ip_Address_Call: {
    type: DataTypes.STRING(15),
    allowNull: true
  },
  Nama_Tamu_Alias: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  Kamar_Alias: {
    type: DataTypes.STRING(30),
    allowNull: true
  }
}, {
  tableName: 'IHP_Room',
  freezeTableName: true,
  timestamps: false
});