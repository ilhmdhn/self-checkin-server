const { DataTypes } = require('sequelize');
const sql = require('../util/sqlz');

const IHP_Pending_Checkin = sql.define('IHP_Pending_Checkin', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true, // Jika id adalah primary key yang di-generate secara otomatis.
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
  expired_payment: {
    type: DataTypes.STRING(19),
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
  tableName: 'IHP_Pending_Checkin',
  timestamps: false, // Jika tabel Anda tidak memiliki kolom timestamp.
});

module.exports = IHP_Pending_Checkin;