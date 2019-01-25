const { Client } = require('../structures/Structures');
const config = require('../config');
const { join } = require('path');
const SequelizeProvider = require('../providers/Sequelize');
const { SQLiteProvider } = require('discord.js-commando');
const sqlite = require('sqlite');

const client = new Client({
  commandPrefix: config.bot.prefix,
  owner: config.bot.owners.split(','),
  invite: config.bot.invite,
  disableEveryone: true,
  unknownCommandResponse: false,
  disabledEvents: ['TYPING_START']
});
client.registry
  .registerDefaultTypes()
  .registerTypesIn({ dirname: join(__dirname, '../types') })
  .registerDefaultGroups()
  .registerGroups([
    ['admin', 'Administrative'],
    ['util', 'Utility'],
    ['user', 'User Commands'],
    ['info', 'Discord Information'],
    ['fun', 'Just for Fun'],
    ['voice', 'Voice Commands']
  ])
  .registerDefaultCommands({
    help: false,
    ping: false
  })
  .registerCommandsIn({ dirname: join(__dirname, '../commands') });
client.database.sync();
client.dispatcher.addInhibitor((message) => {
  const blacklist = client.provider.get('global', 'blacklist', []);
  if (!blacklist.includes(message.author.id)) return false;
  return 'Blacklisted.';
});
module.exports = client;
