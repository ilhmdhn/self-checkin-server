const { DataTypes } = require('sequelize');
const sql = require('../util/sqlz');

module.exports = sql.define('IHP_Rcp', {
    Reception: {
      type: DataTypes.STRING(16),
      allowNull: false,
      primaryKey: true
    },
    DATE: {
      type: DataTypes.STRING(19),
      allowNull: true
    },
    SHIFT: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    Member: {
      type: DataTypes.STRING(16),
      allowNull: true
    },
    Nama: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Kamar: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    Checkin: {
      type: DataTypes.STRING(19),
      allowNull: true
    },
    Jam_Sewa: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    Menit_Sewa: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    Checkout: {
      type: DataTypes.STRING(19),
      allowNull: true
    },
    QM1: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    QM2: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    QM3: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    QM4: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    QF1: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    QF2: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    QF3: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    QF4: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    PAX: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    Keterangan: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    Uang_Muka: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    Id_Payment: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Uang_Voucher: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    Chtime: {
      type: DataTypes.STRING(19),
      allowNull: true
    },
    Chusr: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    MBL: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    Status: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    Posted: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    Surcharge: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    Flag: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    Export: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    Reservation: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    Invoice: {
      type: DataTypes.STRING(16),
      allowNull: true
    },
    Summary: {
      type: DataTypes.STRING(16),
      allowNull: true
    },
    KMS: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    Date_Trans:{
      type: DataTypes.STRING(19),
      allowNull: true
    },
    Reception_Lama: {
      type: DataTypes.STRING(16),
      allowNull: true
    },
    Status_Promo: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    FlagStep: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Complete: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    // Flag_Otp_Web: {
    //   type: DataTypes.STRING(1),
    //   allowNull: true
    // },
    // Otp_Web: {
    //   type: DataTypes.STRING(10),
    //   allowNull: true
    // },
    // Flag_Otp_Sms: {
    //   type: DataTypes.STRING(1),
    //   allowNull: true
    // },
    // Otp_Sms: {
    //   type: DataTypes.STRING(1),
    //   allowNull: true
    // },
    // Hp_Otp_Sms: {
    //   type: DataTypes.STRING(1),
    //   allowNull: true
    // },
    Sign: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    Printed_Slip_Checkin: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    Member_Rev: {
      type: DataTypes.STRING(16),
      allowNull: true
    },
    uploaded: {
      type: DataTypes.INTEGER,
      allowNull: true,
      freezeTableName: true
    }
  }, {
    tableName: 'IHP_Rcp',
    freezeTableName: true,
    timestamps: false
  });  