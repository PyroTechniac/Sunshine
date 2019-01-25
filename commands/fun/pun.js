const puns = require('../../assets/json/pun');
const { Command } = require('../../structures/Structures');
module.exports = class PunCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'pun',
            group: 'fun',
            memberName: 'pun',
            description: 'Responds with a random pun.'
        });
    }
    run(message) {
        return message.say(puns[Math.floor(Math.random() * puns.length)]);
    }
};