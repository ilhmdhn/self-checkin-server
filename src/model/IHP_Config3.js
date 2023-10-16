const { DataTypes } = require('sequelize');
const sql = require('../util/sqlz');

const IHP_Config3 = sql.define('IHP_Config3', {
    RSV: {
        type: DataTypes.STRING(3),
        allowNull: true
    },
    RCP: {
        type: DataTypes.STRING(3),
        allowNull: true
    },
    SOL: {
        type: DataTypes.STRING(3),
        allowNull: true
    },
    OKL: {
        type: DataTypes.STRING(3),
        allowNull: true
    },
    OCL: {
        type: DataTypes.STRING(3),
        allowNull: true
    },
    KLR: {
        type: DataTypes.STRING(3),
        allowNull: true
    },
    IVC: {
        type: DataTypes.STRING(3),
        allowNull: true
    },
    MSK: {
        type: DataTypes.STRING(3),
        allowNull: true
    },
    SUM: {
        type: DataTypes.STRING(3),
        allowNull: true
    },
    VOU1: {
        type: DataTypes.STRING(3),
        allowNull: true
    },
    VOU2: {
        type: DataTypes.STRING(3),
        allowNull: true
    },
    VOU3: {
        type: DataTypes.STRING(3),
        allowNull: true
    },
    VOU4: {
        type: DataTypes.STRING(3),
        allowNull: true
    },
    CHTime: {
        type: DataTypes.STRING(19),
        allowNull: true
    },
    CHUsr: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    Data: {
        type: DataTypes.STRING(1),
        allowNull: true
    }
}, {
    tableName: 'IHP_Config3',
    timestamps: false,
    freezeTableName: true
});

IHP_Config3.removeAttribute('id');

module.exports = IHP_Config3;