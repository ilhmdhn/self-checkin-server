const { DataTypes } = require('sequelize');
const sqlz = require('../util/sqlz');

const IHP_Self_Checkin_Order = sqlz.define('IHP_Self_Checkin_Order', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true, // Jika id adalah primary key yang di-generate secara otomatis.
  },
  reception: {
    type: DataTypes.STRING(16),
    allowNull: false,
  },
  payment_method: {
    type: DataTypes.STRING(16),
    allowNull: false,
  },
  payment_channel: {
    type: DataTypes.STRING(16),
    allowNull: false,
  },
  id_transaction: {
    type: DataTypes.STRING(35),
    allowNull: false,
  },
  checkin_amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  payment_fee: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  checkin_data: {
    type: DataTypes.STRING, // Ubah tipe data sesuai dengan kebutuhan Anda.
    allowNull: false,
  },
}, {
  tableName: 'IHP_Self_Checkin_Order',
  timestamps: false, // Jika tabel Anda tidak memiliki kolom timestamp.
});

module.exports = IHP_Self_Checkin_Order;