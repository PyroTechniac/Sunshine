const { Command } = require('discord-akairo');
const { stripIndents } = require('common-tags');

const RESPONSES = [
    'No.',
    'Not happening.',
    'Maybe later.',
    stripIndents`:ping_pong: Pong! \`$(ping)ms\`
    Heartbeat: \`$(heartbeat)ms\``,
    stripIndents`Just so you know, I'm not doing this for fun! \`$(ping)ms\`
    Doki doki: \`$(heartbeat)ms\``,
    stripIndents`Don't think this means anything special! \`$(ping)ms\`
    Heartbeat: \`$(heartbeat)ms\``,
    stripIndents`Can we get on with this already?! \`$(ping)ms\`
    Heartbeat: \`$(heartbeat)ms\``
];

class PingCommand extends Command {
    constructor() {
        super('ping', {
            aliases: ['ping']
        });
    }

    async exec(message) {
        return message.reply('Pong');
    }
}

module.exports = PingCommand;