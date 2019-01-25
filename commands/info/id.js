const { Command } = require('../../structures/Structures');
module.exports = class IDCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'id',
            aliases: ['user-id', 'member-id'],
            group: 'info',
            memberName: 'id',
            description: 'Responds with a user\'s ID.',
            args: [
                {
                    key: 'user',
                    prompt: 'Which user do you want to get the ID of?',
                    type: 'user',
                    default: message => message.author
                }
            ]
        });
    }
    run(message, { user }) {
        return message.say(`${user.username}'s ID is ${user.id}`);
    }
};