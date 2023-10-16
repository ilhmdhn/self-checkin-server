const { DataTypes } = require('sequelize');
const sql = require('../util/sqlz');

const IHP_Jenis_Kamar = sql.define('IHP_Jenis_Kamar', {
  Nama_Kamar: {
    type: DataTypes.STRING(30),
    allowNull: true
  },
  Hari: {
    type: DataTypes.SMALLINT,
    allowNull: true
  },
  Time_Start: {
    type: DataTypes.STRING(8),
    allowNull: true
  },
  Time_Finish: {
    type: DataTypes.STRING(8),
    allowNull: true
  },
  Overpax: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  Tarif: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  CHTime: {
    type: DataTypes.STRING(19),
    allowNull: true
  },
  CHUsr: {
    type: DataTypes.STRING(30),
    allowNull: true
  },
  Jenis_Tarif: {
    type: DataTypes.SMALLINT,
    allowNull: true
  }
}, {
  tableName: 'IHP_Jenis_Kamar',
  timestamps: false,
  freezeTableName: true
});

IHP_Jenis_Kamar.removeAttribute('id');
module.exports = IHP_Jenis_Kamar;