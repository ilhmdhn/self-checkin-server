const { DataTypes } = require('sequelize');
const sql = require('../util/sqlz');


const IHP_Sod = sql.define('IHP_Sod', {
  SlipOrder: {
    type: DataTypes.STRING(16),
    allowNull: false,
    primaryKey: true
  },
  Inventory: {
    type: DataTypes.STRING(20),
    allowNull: false,
    primaryKey: true
  },
  Nama: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  Price: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  Qty: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  Qty_Terima: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  Total: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  Status: {
    type: DataTypes.STRING(1),
    allowNull: true
  },
  Location: {
    type: DataTypes.SMALLINT,
    allowNull: true
  },
  Printed: {
    type: DataTypes.SMALLINT,
    allowNull: true
  },
  Note: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  CHUsr: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  Tgl_Terima: {
    type: DataTypes.STRING(19),
    allowNull: true
  },
  Tgl_Kirim: {
    type: DataTypes.STRING(19),
    allowNull: true
  },
  Urut: {
    type: DataTypes.SMALLINT,
    allowNull: true
  }
}, {
  tableName: 'IHP_Sod',
  timestamps: false,
  freezeTableName: true
});

module.exports = IHP_Sod;