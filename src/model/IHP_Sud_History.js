const { DataTypes } = require('sequelize');
const sequelize = require('../util/sqlz'); // Pastikan Anda mengimpor atau membuat instance Sequelize sesuai dengan konfigurasi Anda.

const IHP_Sud_History = sequelize.define('IHP_Sud_History', {
  Summary: {
    type: DataTypes.STRING(16),
    allowNull: false,
  },
  ID_Payment: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Nama_Payment: {
    type: DataTypes.STRING(20),
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
  Input1: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  Input2: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  Input3: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  Input4: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  Pay_Value: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  EDC_Machine: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  Status: {
    type: DataTypes.STRING(1),
    allowNull: true,
  },
  History: {
    type: DataTypes.SMALLINT,
    allowNull: true,
  },
  Change_Time: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: 'IHP_Sud_History',
  timestamps: false, // Jika tabel Anda tidak memiliki kolom timestamp.
  freezeTableName: true,
});

IHP_Sud_History.removeAttribute('id');

module.exports = IHP_Sud_History;