const { DataTypes } = require('sequelize');
const sql = require('../util/sqlz'); // Anda harus mengimpor atau membuat instance Sequelize sesuai dengan konfigurasi Anda.

const IHP_IPAddress = sql.define('IHP_IPAddress', {
  Aplikasi: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  IP_Address: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  Server_Socket_Port: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  Server_Udp_Port: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
  tableName: 'IHP_IPAddress',
  timestamps: false,
  freezeTableName: true,
});

IHP_IPAddress.removeAttribute('id');

module.exports = IHP_IPAddress;
