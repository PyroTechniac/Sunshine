const { Command } = require('../../structures/Structures');
const throttlingUsages = 1;
const throttlingDuration = 60;
const throttlingDesc = `${throttlingUsages} use${throttlingUsages > 1 ? 's' : ''} every ${throttlingDuration} seconds`;
module.exports = class D20Command extends Command {
    constructor(client) {
        super(client, {
            name: 'd20',
            group: 'fun',
            memberName: 'd20',
            description: `Roll a d20! ${throttlingDesc}`,
            throttling: { usages: throttlingUsages, duration: throttlingDuration },
            guildOnly: true
        });
    }
    run(message) {
        const roll = Math.ceil(Math.random() * 20);
        let rollText = `**${roll}`;
        if (roll === 20) rollText += ' -- CRIT! 💯';
        else if (roll === 1) rollText += ' -- FAIL! ☠️';
        rollText += '**';
        return message.say(`Rolling a D20 for ${message.author} 🎲 ... ${rollText}`);
    }
};