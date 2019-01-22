const { Command } = require('../../structures/Structures');
const { list } = require('../../util/Util');
const { join } = require('path');
const sounds = require('../../assets/json/soundboard');
const throttlingUsages = 1;
const throttlingDuration = 10;
const throttlingDesc = `${throttlingUsages} use ${throttlingUsages > 1 ? 's' : ''} every ${throttlingDuration} seconds.`;
module.exports = class SoundBoardCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'soundboard',
            aliases: ['sound'],
            group: 'voice',
            memberName: 'soundboard',
            description: `Plays a sound in your voice channel. ${throttlingDesc}`,
            details: `**Sounds:** ${Object.keys(sounds).join(', ')}`,
            guildOnly: true,
            throttling: { usages: throttlingUsages, duration: throttlingDuration },
            userPermissions: ['CONNECT', 'SPEAK'],
            clientPermissions: ['ADD_REACTIONS', 'READ_MESSAGE_HISTORY'],
            args: [
                {
                    key: 'sound',
                    prompt: `What sound would you like to play? Either ${list(Object.keys(sounds), 'or')}`,
                    type: 'string',
                    oneOf: Object.keys(sounds),
                    parse: sound => sound.toLowerCase(),
                },
            ],
        });
    }
    async run(message, { sound }) {
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) return message.reply('Please connect to a voice channel first.');
        if (!voiceChannel.permissionsFor(this.client.user).has(['CONNECT', 'SPEAK'])) {
            return message.reply('Missing the "Connect" or "Speak" permission for the voice channel.');
        }
        if (!voiceChannel.joinable) return message.reply('Your voice channel is not joinable.');
        if (this.client.voiceConnections.has(voiceChannel.guild.id)) return message.reply('I am already playing a sound.');
        try {
            const connection = await voiceChannel.join();
            const dispatcher = connection.play(join(__dirname, '..', '..', 'assets', 'sounds', sounds[sound]));
            await message.react('🔉');
            dispatcher.once('finish', () => voiceChannel.leave());
            dispatcher.once('error', () => voiceChannel.leave());
            return null;
        }
        catch (err) {
            voiceChannel.leave();
            throw err;
        }
    }
};