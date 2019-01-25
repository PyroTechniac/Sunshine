const { Command } = require('../../structures/Structures');
module.exports = class VouchCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'vouch',
            group: 'user',
            memberName: 'vouch',
            guildOnly: true,
            description: 'For vouching for other members!',
            args: [
                {
                    key: 'newbie',
                    prompt: 'Enter the newbie you want to vouch for',
                    type: 'member'
                }
            ]
        });
    }
    async run(message, { newbie }) {
        const members = require('../../server/models');
        const newbieEntry = members.findOne({ where: { newbieUserId: newbie.user.id } });
        console.log(newbieEntry);
    }
};