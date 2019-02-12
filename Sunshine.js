const config = require('./config');
const { AkairoClient } = require('discord-akairo');
const client = new AkairoClient({
    ownerID: config.owners
}, {
    disableEveryone: true,
    disabledEvents: ['TYPING_START']
});