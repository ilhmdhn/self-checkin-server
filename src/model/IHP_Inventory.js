const { DataTypes } = require('sequelize');
const sql = require('../util/sqlz');

const IHP_Inventory = sql.define('IHP_Inventory', {
    Inventory: {
        type: DataTypes.STRING(20),
        allowNull: false,
        primaryKey: true
    },
    Nama: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    GROUP: {
        type: DataTypes.SMALLINT,
        allowNull: true
    },
    Weight: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    QMin: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    QOrder: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    Location: {
        type: DataTypes.SMALLINT,
        allowNull: true
    },
    Unit: {
        type: DataTypes.STRING(6),
        allowNull: true
    },
    Price: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    Price2: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    Account: {
        type: DataTypes.STRING(8),
        allowNull: true
    },
    Status: {
        type: DataTypes.SMALLINT,
        allowNull: true
    },
    Stock: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    Export: {
        type: DataTypes.STRING(1),
        allowNull: true
    },
    CHTime: {
        type: DataTypes.DATE,
        allowNull: true
    },
    CHUsr: {
        type: DataTypes.STRING(30),
        allowNull: true
    },
    Supplier: {
        type: DataTypes.STRING(16),
        allowNull: true
    },
    StrName: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    Service: {
        type: DataTypes.SMALLINT,
        allowNull: true
    },
    Pajak: {
        type: DataTypes.SMALLINT,
        allowNull: true
    },
    Point: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    Reward: {
        type: DataTypes.STRING(1),
        allowNull: true
    },
    InventoryID_Global: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    Olahan: {
        type: DataTypes.STRING(1),
        allowNull: true
    }
}, {
    tableName: 'IHP_Inventory',
    freezeTableName: true,
    timestamps: false
});

module.exports = IHP_Inventory;