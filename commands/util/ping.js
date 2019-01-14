const { stripIndents } = require('common-tags');
const { Command } = require('../../structures/Structures');
const { formatNumber } = require('../../util/Util');

module.exports = class PingCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'ping',
      aliases: ['pong', 'ping-pong'],
      group: 'util',
      memberName: 'ping',
      description: 'Checks the bots ping to the server',
      guarded: true,
    });
  }

  async run(msg) {
    const message = await msg.say('Pinging...');
    const ping = Math.round(message.createdTimestamp - msg.createdTimestamp);
    return message.edit(stripIndents`
          🏓 P${'o'.repeat(Math.min(Math.round(ping / 100), 1500))}ng! \`${formatNumber(ping)}ms\`
          Heartbeat: \`${formatNumber(Math.round(this.client.ws.ping))}ms\`
        `);
  }
};
