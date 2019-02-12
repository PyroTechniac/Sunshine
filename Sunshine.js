const config = require('./config');
const { AkairoClient } = require('discord-akairo');
const client = new AkairoClient();
client.login(config.token);