const { Command } = require('../../structures/Structures');
const client = require('../../server/client');
const { MessageEmbed } = require('discord.js');
module.exports = class JoinCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'join',
            group: 'user',
            memberName: 'join',
            description: 'Allows requesting to join the clan',
            args: [
                {
                    key: 'aboveEighteen',
                    prompt: 'As this is a somewhat mature clan, are you above the age of 18? Please answer yes or no',
                    type: 'string',
                    oneOf: ['yes', 'no'],
                },
                {
                    key: 'primaryPlatform',
                    prompt: 'What is your primary platform for playing Destiny 2?',
                    type: 'string',
                    oneOf: ['xbox', 'ps4', 'pc'],
                },
                {
                    key: 'extraPlatforms',
                    prompt: 'If you play on an extra platform, please enter them here, separated by spaces, or enter none',
                    type: 'string',
                },
                {
                    key: 'gamertag',
                    prompt: 'Please enter your gamertag, if you\'re on PC, please enter the discriminator after',
                    type: 'string',
                },
                {
                    key: 'bungieLink',
                    prompt: 'Please enter your bungie link, so we can invite you when you hit full membership!',
                    type: 'string',
                    wait: 240,
                },
                {
                    key: 'email',
                    prompt: 'Please enter your email address. DISCLAIMER: Your email will remain private -- it\'s only used by admins to contact you in case there\'s an issue during the join process or you\'re about to be kicked for inactivity.',
                    type: 'string',
                    wait: 60,
                },
                {
                    key: 'tidbit',
                    prompt: 'We like our flermerngers to have some personality, so please tell us something about yourself! WARNING: We have denied membership for half assing this answer',
                    type: 'string',
                    max: 1500,
                    wait: 600,
                },
            ],
        });
    }
    async primaryRoleUpdate(flermling, primary, guild) {
        flermling.roles.add(guild.roles.filter(role => role.name === `${primary.toLowerCase()}`));
        return flermling;
    }
    async run(message, { aboveEighteen, primaryPlatform, extraPlatforms, gamertag, bungieLink, email, tidbit }) {
        const newbieTable = require('../../server/models');
        const flermling = await this.client.myGuild.members.fetch(message.author.id);
        const newbieEntry = await newbieTable.findOne({ where: { newbieUserId: message.author.id } });
        const rosterMessage = await this.client.myChannels.roster.messages.fetch(newbieEntry.rosterMessage);
        await this.primaryRoleUpdate(flermling, primaryPlatform, client.myGuild);
        await newbieEntry.update({
            gamerTag: gamertag,
            tidbit: tidbit,
            bungieLink: bungieLink,
            emailAddress: email,
            joinStatus: 'FLERMLING',
        });
        await flermling.roles.add(this.client.myRoles.newbies);
        await rosterMessage.edit(`New Flermling ${flermling}\`\`\`${tidbit}\`\`\``);
    }
};