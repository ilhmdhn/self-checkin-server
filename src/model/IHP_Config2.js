const { DataTypes } = require('sequelize');
const sql = require('../util/sqlz');

const IHP_Config2 = sql.define('IHP_Config2', {
  Surcharge_Persen_Room: {
    type: DataTypes.SMALLINT,
    allowNull: true
  },
  Surcharge_Rp_Room: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  Service_Persen_Room: {
    type: DataTypes.SMALLINT,
    allowNull: true
  },
  Service_Rp_Room: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  Tax_Persen_Room: {
    type: DataTypes.SMALLINT,
    allowNull: true
  },
  Tax_Rp_Room: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  Service_Persen_Food: {
    type: DataTypes.SMALLINT,
    allowNull: true
  },
  Service_Rp_Food: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  Tax_Persen_Food: {
    type: DataTypes.SMALLINT,
    allowNull: true
  },
  Tax_Rp_Food: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  CHTime: {
    type: DataTypes.DATE,
    allowNull: true
  },
  CHusr: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  Data: {
    type: DataTypes.STRING(1),
    allowNull: true
  },
  Date_Trans: {
    type: DataTypes.DATE,
    allowNull: true
  },
  RUMUS_PAJAK_ROOM: {
    type: DataTypes.SMALLINT,
    allowNull: true
  },
  RUMUS_PAJAK_FOOD: {
    type: DataTypes.SMALLINT,
    allowNull: true
  },
  RUMUS_SERVICE_ROOM: {
    type: DataTypes.SMALLINT,
    allowNull: true
  },
  RUMUS_SERVICE_FOOD: {
    type: DataTypes.SMALLINT,
    allowNull: true
  },
  RUMUS_PAJAK_MINIMART: {
    type: DataTypes.SMALLINT,
    allowNull: true
  },
  RUMUS_SERVICE_MINIMART: {
    type: DataTypes.SMALLINT,
    allowNull: true
  }
}, {
  tableName: 'IHP_Config2',
  timestamps: false,
  freezeTableName: true
});

IHP_Config2.removeAttribute('id');

module.exports = IHP_Config2;