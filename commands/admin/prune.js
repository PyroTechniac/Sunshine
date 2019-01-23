const { Command } = require('../../structures/Structures');
module.exports = class PruneCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'prune',
            aliases: ['clear'],
            group: 'admin',
            memberName: 'prune',
            description: 'Deletes up to 99 messages from the current channel',
            guildOnly: true,
            // ownerOnly: true,
            throttling: { usages: 1, duration: 10 },
            clientPermissions: ['READ_MESSAGE_HISTORY', 'MANAGE_MESSAGES'],
            userPermissions: ['MANAGE_MESSAGES'],
            args: [
                {
                    key: 'count',
                    label: 'amount of messages',
                    prompt: 'How many messages do you want to delete? Limit up to 99',
                    type: 'integer',
                    min: 1,
                    max: 99,
                },
            ],
        });
    }
    async run(message, { count }) {
        try {
            const messages = await message.channel.messages.fetch({ limit: count + 1 });
            await message.channel.bulkDelete(messages, true);
            return null;
        }
        catch (error) {
            return message.reply('There are no messages younger than two weeks that can be deleted.');
        }
    }
};