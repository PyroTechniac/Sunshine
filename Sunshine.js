const discordjs = require('discord.js');
const config = require('./config');
const client = require('./server/client');
const { Collection } = require('discord.js');
const readyInit = require('./events/ready-init');
const memberJoin = require('./events/join-process');

const originalMembersFunction = discordjs.MessageMentions.members;
discordjs.MessageMentions.members = (function(originalMembersFunction) {
  return function(...args) {
    if (this._members) return this._members;
    if (!this.guild) return null;
    this._members = new Collection();
    let matches;
    while ((matches = this.constructor.USERS_PATTERN.exec(this._content)) !== null) {
      const member = this.guild.members.get(matches[1]);
      if (member) this._members.set(member.id, member);
    }
    return this._members;
  };
}(originalMembersFunction));
client.on('ready', readyInit);
client.on('guildMemberAdd', memberJoin);
client.on('commandError', (command, error) => console.error('[COMMAND ERROR]', command.name, error));
client.on('error', error => console.error('[ERROR]', error));
client.login(config.bot.token);
process.on('unhandledRejection', error => {
  console.error('[PROMISE ERROR]', error);
  process.exit(-1);
});