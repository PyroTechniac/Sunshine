const { Command } = require('../../structures/Structures');
const { MessageEmbed } = require('discord.js');
module.exports = class EmbedMakerCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'embed-maker',
            aliases: ['embed', 'embedder'],
            group: 'fun',
            memberName: 'embed-maker',
            description: 'An interactive embed maker!',
            throttling: { usages: 1, duration: 30 }
        });
    }
    async run(message) {
        const embed = new MessageEmbed();
        message.embed(embed);
    }
};