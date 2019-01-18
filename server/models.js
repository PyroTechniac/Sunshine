const client = require('./client');
const { STRING, TEXT, INTEGER } = require('sequelize');
const newbie = client.database.define('newbie', {
    newbieUserId: {
        type: STRING,
        primaryKey: true,
        unique: true,
    },
    gamerTag: STRING,
    tidbit: TEXT,
    discordTag: TEXT,
    bungieLink: STRING,
    emailAddress: STRING,
    vouchers: {
        type: INTEGER,
        defaultValue: 0,
    },
    vouchedBy: STRING,
    joinStatus: STRING,
    rosterMessage: STRING,
}, {
        hooks: {
            afterUpdate: (newbie) => {
                console.log(newbie);
            },
        },
    });
module.exports = newbie;