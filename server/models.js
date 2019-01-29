const client = require('./client');
const { STRING, TEXT, INTEGER } = require('sequelize');
const members = client.database.define('members', {
    newbieUserId: {
        type: STRING,
        primaryKey: true,
        unique: true
    },
    gamerTag: STRING,
    tidbit: TEXT,
    discordTag: TEXT,
    bungieLink: STRING,
    emailAddress: STRING,
    vouches: {
        type: INTEGER,
        defaultValue: 0
    },
    joinStatus: STRING,
    rosterMessage: STRING
});
const vouches = client.database.define('vouches', {
    voucherId: {
        type: STRING,
        primaryKey: true
    },
    voucheeId: {
        type: STRING,
        primaryKey: true
    },
    reason: TEXT
});
members.hasMany(vouches, {
    as: 'vouchees',
    constraints: true,
    foreignKey: {
        field: 'voucheeId',
        primaryKey: true
    },
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION'
});
members.hasMany(vouches, {
    as: 'vouchers',
    constraints: true,
    foreignKey: {
        field: 'voucherId',
        primaryKey: true
    },
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION'
});
vouches.belongsTo(members, { targetKey: 'newbieUserId', foreignKey: 'voucherId', as:'vouchers' });
vouches.belongsTo(members, { targetKey: 'newbieUserId', foreignKey: 'voucheeId', as:'vouchees' });
module.exports = {
    memberTable: members,
    vouchesTable: vouches
};