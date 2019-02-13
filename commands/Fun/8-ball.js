const answers = require('../../assets/json/8ball');
const { Command } = require('klasa');

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['8', 'magic', 'mirror'],
            description: 'Magic 8-Ball, does exactly what the toy does',
            usage: '<query:string>'
        });
    }
    async run(message, [query]) {
        return message.reply(query.endsWith('?') ?
            `🎱 ${answers[Math.floor(Math.random() * answers.length)]}` :
            '🎱 That doesn\'t look like a question. Please try again');
    }
};