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
    async run(message, { aboveEighteen, primaryPlatform, extraPlatforms, gamertag, bungieLink, email, tidbit }) {
        // TODO: Try to move this to top of file (throwing error)
        const newbieTable = require('../../server/models');
        const platformArray = extraPlatforms.split(' ');
        const flermling = await this.client.myGuild.members.fetch(message.author.id);
        const roleResolvable = [];
        platformArray.forEach(async role => {
            if (role.toLowerCase() === 'none') return;
            await roleResolvable.push(this.client.myGuild.roles.find(r => r.name === `${role.toLowerCase()}-muted`).id);
        });
        roleResolvable.push(this.client.myGuild.roles.find(role => role.name === `${primaryPlatform.toLowerCase()}`).id);
        roleResolvable.push(this.client.myRoles.newbies.id);
        roleResolvable.push(this.client.myRoles.all.id);
        const newbieEntry = await newbieTable.findOne({ where: { newbieUserId: message.author.id } });
        let rosterMessage = await this.client.myChannels.roster.messages.fetch(newbieEntry.rosterMessage);
        if (rosterMessage === 'undefined') {
            rosterMessage = await this.client.myChannels.roster.send(`New Flermling ${flermling}\`\`\`${tidbit}\`\`\``);
        }
        else {
            await rosterMessage.edit(`New Flermling ${flermling}\`\`\`${tidbit}\`\`\``);
        }
        await newbieEntry.update({
            gamerTag: gamertag,
            tidbit: tidbit,
            bungieLink: bungieLink,
            emailAddress: email,
            joinStatus: 'FLERMLING',
            rosterMessage: rosterMessage.id,
        });
        await rosterMessage.edit(`New Flermling ${flermling}\`\`\`${tidbit}\`\`\``);
        await flermling.edit({
            nick: gamertag,
            roles: roleResolvable,
        });
        await rosterMessage.react('👍');
        const filter = (reaction, user) => reaction.emoji.name === '👍' && user.bot !== true;
        const collector = await rosterMessage.createReactionCollector(filter, { max: 4, time: 14400000 });
        collector.on('end', collected => {
            this.client.myChannels.welcome.send(`${this.client.myRoles.all} Help me welcome our newest flermling ${flermling}!`);
        });
    }
};