const { DataTypes } = require('sequelize');
const sequelize = require('../util/sqlz'); // Pastikan Anda mengimpor atau membuat instance Sequelize sesuai dengan konfigurasi Anda.

const IHP_UangVoucher = sequelize.define('IHP_UangVoucher', {
  Reception: {
    type: DataTypes.STRING(16),
    allowNull: true,
  },
  Voucher: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  Pay_Value: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  Flag: {
    type: DataTypes.STRING(1),
    allowNull: true,
  },
}, {
  tableName: 'IHP_UangVoucher',
  timestamps: false, // Jika tabel Anda tidak memiliki kolom timestamp.
  freezeTableName: true,
});

IHP_UangVoucher.removeAttribute('id');
module.exports = IHP_UangVoucher;