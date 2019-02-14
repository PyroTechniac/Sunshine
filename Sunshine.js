const config = require('./config');
const { Client } = require('klasa');
Client.defaultUserSchema.add('TODOs', 'any', { array: true });
Client.defaultGuildSchema.add('antiinvite', 'boolean', { default: false });
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
    },
    language: 'en-US'
});
client.login(config.token);