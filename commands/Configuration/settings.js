const { Command } = require('klasa');

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: 'settings',
            description: 'Set core settings'
        });
    }
    async run(message) {
        console.log(message.guild.settings);
    }
};