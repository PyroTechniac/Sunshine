const { Command } = require('../../structures/Structures');
const { MessageEmbed } = require('discord.js');
module.exports = class FirstMessageCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'first-message',
            aliases: ['first-msg'],
            group: 'info',
            memberName: 'first-message',
            description: 'Responds with the first message ever sent to a channel.',
            clientPermissions: ['EMBED_LINKS', 'READ_MESSAGE_HISTORY'],
            args: [
                {
                    key: 'channel',
                    prompt: 'Which channel would you like to get the first message of?',
                    type: 'channel',
                    default: message => message.channel,
                },
            ],
        });
    }
    async run(message, { channel }) {
        if (channel.type === 'text' && !channel.permissionsFor(this.client.user).has('READ_MESSAGE_HISTORY')) {
            return message.say(`Sorry, I don't have permission to read ${channel}...`);
        }
        if (channel.type === 'text' && !channel.permissionsFor(message.author).has('READ_MESSAGE_HISTORY')) {
            return message.say(`Hey! You don't have permission to read ${channel}!`);
        }
        const messages = await channel.messages.fetch({ after: 1, limit: 1 });
        const msg = messages.first();
        const format = message.author.avatar && message.author.avatar.startsWith('a_') ? 'gif' : 'png';
        const embed = new MessageEmbed()
            .setColor(message.member ? message.member.displayHexColor : this.client.config.bot.embed.color)
            .setThumbnail(message.author.displayAvatarURL({ format }))
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ format }))
            .setDescription(msg.content)
            .setTimestamp(msg.createdAt)
            .setFooter(`ID: ${msg.id}`)
            .addField('❯ Jump', msg.url);
        return message.embed(embed);
    }
};