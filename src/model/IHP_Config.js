const { DataTypes } = require('sequelize');
const sql = require('../util/sqlz');

const IHP_Config = sql.define('IHP_Config', {
    Outlet: {
        type: DataTypes.STRING(10),
        allowNull: true
    },
    Nama_Outlet: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    Alamat_Outlet: {
        type: DataTypes.STRING(40),
        allowNull: true
    },
    Alamat_Outlet2: {
        type: DataTypes.STRING(40),
        allowNull: true
    },
    Tlp1: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    Tlp2: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    Fax: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    Kota: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    Workdate_Start: {
        type: DataTypes.SMALLINT,
        allowNull: true
    },
    Workdate_Finish: {
        type: DataTypes.SMALLINT,
        allowNull: true
    },
    Worktime_Start: {
        type: DataTypes.STRING(8),
        allowNull: true
    },
    Worktime_Finish: {
        type: DataTypes.STRING(8),
        allowNull: true
    },
    ShiftDate: {
        type: DataTypes.SMALLINT,
        allowNull: true
    },
    Shifttime: {
        type: DataTypes.STRING(8),
        allowNull: true
    },
    CHTime: {
        type: DataTypes.DATE,
        allowNull: true
    },
    CHUsr: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    DATA: {
        type: DataTypes.STRING(1),
        allowNull: true
    },
    Date_Trans: {
        type: DataTypes.DATE,
        allowNull: true
    },
    GantiTarif1Date: {
        type: DataTypes.SMALLINT,
        allowNull: true
    },
    GantiTarif1Time: {
        type: DataTypes.STRING(8),
        allowNull: true
    },
    GantiTarif2Date: {
        type: DataTypes.SMALLINT,
        allowNull: true
    },
    GantiTarif2Time: {
        type: DataTypes.STRING(8),
        allowNull: true
    },
    DBNormal: {
        type: DataTypes.SMALLINT,
        allowNull: true
    },
    DBPajak: {
        type: DataTypes.SMALLINT,
        allowNull: true
    }
}, {
    tableName: 'IHP_Config',
    timestamps: false,
    freezeTableName: true,
});

IHP_Config.removeAttribute('id');

module.exports = IHP_Config;