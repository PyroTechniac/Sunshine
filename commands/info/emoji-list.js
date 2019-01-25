const { Command } = require('../../structures/Structures');
const { list } = require('../../util/Util');
const types = ['animated', 'regular'];
module.exports = class EmojiListCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'emoji-list',
            aliases: ['emotes', 'emojis', 'emote-list'],
            group: 'info',
            memberName: 'emoji-list',
            description: 'Responds with a list of the server\'s custom emojis.',
            guildOnly: true,
            args: [
                {
                    key: 'type',
                    prompt: `What type of emoji would you like to view? Either ${list(types, 'or')}.`,
                    type: 'string',
                    default: 'regular',
                    oneOf: types,
                    parse: type => type.toLowerCase()
                }
            ]
        });
    }
    run(message, { type }) {
        const emojis = message.guild.emojis.filter(emoji => (type === 'animated' ? emoji.animated : !emoji.animated));
        if (!emojis.size) return message.say(`This server has no ${type} custom emojis.`);
        return message.say(emojis.map(emoji => emoji.toString()).sort().join(' '), { split: { char: ' ' } });
    }
};