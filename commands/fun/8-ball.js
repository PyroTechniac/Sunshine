const { stripIndents } = require('common-tags');
const { Command } = require('../../structures/Structures');
const answers = require('../../assets/json/8ball');
const throttlingUsages = 1;
const throttlingDuration = 60;
const throttlingDesc = `${throttlingUsages} use${throttlingUsages > 1 ? 's' : ''} every ${throttlingDuration} seconds.`;
module.exports = class EightBallCommand extends Command {
    constructor(client) {
        super(client, {
            name: '8ball',
            aliases: ['8-ball'],
            group: 'fun',
            memberName: '8ball',
            description: `Ask the magic 8 ball a yes/no question! ${throttlingDesc}`,
            examples: [`${client.commandPrefix}8ball Will Gjallarhorn drop in my next raid?`],
            throttling: { usages: throttlingUsages, duration: throttlingDuration },
            guildOnly: true,
            argsPromptLimit: 0,
            args: [
                {
                    key: 'question',
                    prompt: 'What do you want to ask the Magic 8-Ball?',
                    type: 'string',
                    max: 500,
                },
            ],
        });
    }
    run(message, { question }) {
        return message.say(stripIndents`
        ${message.author} asked "${question}"

        🎱 says! ... ${answers[Math.floor(Math.random() * answers.length)]}
        `);
    }
};