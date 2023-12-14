const { DataTypes } = require('sequelize');
const sequelize = require('../util/sqlz'); // Pastikan Anda mengimpor atau membuat instance Sequelize sesuai dengan konfigurasi Anda.

const IHP_Payment_Gateway = sequelize.define('IHP_Payment_Gateway', {
  reception: {
    type: DataTypes.STRING(14),
    allowNull: false,
    primaryKey: true,
  },
  method: {
    type: DataTypes.STRING(10),
    allowNull: true,
  },
  channel: {
    type: DataTypes.STRING(10),
    allowNull: true,
  },
  fee: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
}, {
  tableName: 'IHP_Payment_Gateway',
  timestamps: false, // Jika tabel Anda tidak memiliki kolom timestamp.
  freezeTableName: true
});

module.exports = IHP_Payment_Gateway;