const config = require('./config');
const { AkairoClient } = require('discord-akairo');
const client = new AkairoClient({
    ownerID: config.owners,
    prefix: config.prefix,
    commandDirectory: './commands/',
    listenerDirectory: './listeners/'
}, {
    disableEveryone: true,
    disabledEvents: ['TYPING_START']
});
client.login(config.token);