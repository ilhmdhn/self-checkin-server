const { DataTypes } = require('sequelize');
const sql = require('../util/sqlz');

const IHP_Rcp_DetailsRoom = sql.define('IHP_Rcp_DetailsRoom', {
    Reception: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    Nama_Kamar: {
        type: DataTypes.STRING(30),
        allowNull: true
    },
    Hari: {
        type: DataTypes.SMALLINT,
        allowNull: true
    },
    Overpax: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    Tarif: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    Time_Start: {
        type: DataTypes.STRING(19),
        allowNull: true
    },
    Time_Finish: {
        type: DataTypes.STRING(19),
        allowNull: true
    }
}, {
    tableName: 'IHP_Rcp_DetailsRoom',
    timestamps: false,
    freezeTableName: true
});

IHP_Rcp_DetailsRoom.removeAttribute('id');

module.exports = IHP_Rcp_DetailsRoom;