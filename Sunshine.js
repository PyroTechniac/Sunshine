const config = require('./config');
const { Client } = require('klasa');
Client.defaultUserSchema.add('TODOs', 'any', { array: true });
const client = new Client({
    ownerID: config.owner,
    prefix: config.prefix,
    providers: {
        default: 'mongodb',
        mongodb: config.database
    },
    consoleEvents: {
        verbose: true,
        log: true,
        error: true,
        warn: true,
        wtf: true
    }
});
client.login(config.token);