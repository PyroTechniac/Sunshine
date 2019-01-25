const { MessageEmbed } = require('discord.js');
const moment = require('moment');
require('moment-duration-format');
const { Command } = require('../../structures/Structures');
const { version } = require('../../package');
const { formatNumber } = require('../../util/Util');
module.exports = class InfoCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'info',
            aliases: ['stats'],
            group: 'util',
            memberName: 'info',
            description: 'Responds with detailed bot information',
            guarded: true,
            clientPermissions: ['EMBED_LINKS']
        });
    }
    run(message) {
        const embed = new MessageEmbed()
            .setColor(this.client.config.bot.embed.color)
            .addField('❯ Servers', formatNumber(this.client.guilds.size), true)
            .addField('❯ Shards', formatNumber(this.client.options.shardCount), true)
            .addField('❯ Commands', formatNumber(this.client.registry.commands.size), true)
            .addField('❯ Home Server', this.client.options.invite ? `[Here](${this.client.options.invite})` : 'None', true)
            .addField('❯ Memory Usage', `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`, true)
            .addField('❯ Uptime', moment.duration(this.client.uptime).format('hh:mm:ss', { trim: false }), true)
            .addField('❯ Version', `v${version}`, true)
            .addField('❯ Node Version', process.version, true)
            .addField(
                '❯ Library',
                '[discord.js](https://discord.js.org)[-commando](https://github.com/discordjs/Commando)', true
            );
        return message.embed(embed);
    }
};