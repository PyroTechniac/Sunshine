const { stripIndents } = require('common-tags')
const config = require("../../config")
const { MessageEmbed } = require("discord.js")
const throttlingInfo = {
    throttlingUsages: 1,
    throttlingDuration: 60,
    throttlingDesc: `${this.throttlingUsages} use${this.throttlingUsages > 1 ? 's' : ''} every ${this.throttlingDuration} seconds.`
}
const SunshineCommand = require("../../structures/Command")
module.exports = class HelpCommand extends SunshineCommand {
    constructor(client) {
        super(client, {
            name: "help",
            aliases: ['commands', 'command-list', 'halp', 'wtf', 'what-the-even-is'],
            group: "util",
            memberName: "help",
            description: `Displays a list of available commands, or detailed information for a specific command. ${throttlingInfo.throttlingDesc}`,
            throttling: { usages: throttlingInfo.throttlingUsages, duration: throttlingInfo.throttlingDuration },
            args: [
                {
                    key: "command",
                    prompt: "Enter the command you would like to view the help for",
                    type: "command",
                    default: "",
                },
            ],

        })
    }
    async run(message, { command }) {
        if (!command) {
            const embed = new MessageEmbed()
                .setTitle('Command List')
                .setDescription(`Use ${message.usage('<command>')} to view detailed information about a command.`)
                .setColor(config.bot.embed.color)
                .setFooter(`${this.client.registry.commands.size} Commands`);
            this.client.registry.groups
                // Omit admin and command mgmt groups (unless responding to bot owner)
                .filter(group => this.client.isOwner(message.author) || group.id !== 'admin')
                .forEach((group) => {
                    embed.addField(
                        `❯ ${group.name}`,
                        group.commands
                            // Omit admin-only commands (unless responding to bot owner)
                            .filter(cmd => this.client.isOwner(message.author) || !cmd.ownerOnly)
                            .map(cmd => cmd.name)
                            .join(', ')
                        || '_(None)_'
                    );
                });
            try {
                const messages = [];
                messages.push(await message.direct({ embed }));
                if (message.channel.type !== 'dm') messages.push(await message.say('📬 Sent you a DM with some helpful info'));
                return messages;
            } catch (err) {
                return message.reply('Failed to send DM. Check settings and make sure you\'ve allowed DMs from server members.');
            }
        }
        return message.say(stripIndents`
      __Command **${command.name}**__${command.guildOnly ? ' (Usable only in servers)' : ''}
      ${command.description}${command.details ? `\n_${command.details}_` : ''}
      **Format**: ${message.anyUsage(`${command.name} ${command.format || ''}`)}
      **Aliases**: ${command.aliases.join(', ') || 'None'}
      **Group**: ${command.group.name} (\`${command.groupID}:${command.memberName}\`)
    `);
    }
};