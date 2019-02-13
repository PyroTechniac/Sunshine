const { Command, RichDisplay } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            description: 'Test RichDisplay',
            runIn: ['text']
        });
    }
    async run(message) {
        return new RichDisplay()
            .addPage(new MessageEmbed().setDescription('First page'))
            .addPage(new MessageEmbed().setDescription('Second page'))
            .run(await message.send('Loading...'));
    }
};