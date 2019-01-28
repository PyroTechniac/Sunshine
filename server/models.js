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
    voucherId: STRING,
    voucheeId: STRING,
    reason: TEXT
});
module.exports = {
    memberTable: members,
    vouchesTable: vouches
};