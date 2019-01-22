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
                    wait: 600,
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
    hasPermission(message) {
        const member = this.client.myGuild.member(message.author);
        if (member.roles.find(r => r.id === this.client.myRoles.newbies.id)) return 'You\'ve already applied once, please wait for the mods to approve your join form.';
        return true;
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
        const collector = await rosterMessage.createReactionCollector(filter, { max: 1, time: 14400000 });
        collector.on('end', (collected, endReason) => {
            this.client.myChannels.welcome.send(`${this.client.myRoles.all} Help me welcome our newest flermling ${flermling}! :hatched_chick:\n\nNew guy/gal -- as you may have seen, we have a join process to make sure you're a good fit for our community. As mentioned in ${this.client.myGuild.channels.find(c => c.name === 'getting-started')}, you'll need to participate both **in game** to get vouched and **here in Discord to gain server rank**...\n\n1. When you're ready to play, head over to ${this.client.myGuild.channels.find(c => c.name === `${primaryPlatform.toLowerCase()}-destiny-lfg`)} and send command \`!need-vouch-${primaryPlatform.toLowerCase()}\` to ask our friendly members to team up with you -- you need **five** of them to play with and :point_up: vouch for you\n\n2. Keep participating here in Discord until you reach **level 4** (40 messages send w/ 1-min cooldown) -- as a Flermling, you can send messages in your platform LFG channel plus ${this.client.myChannels.welcome}, ${this.client.myGuild.channels.find(c => c.name === 'kudos')}, ${this.client.myChannels.meta}, ${this.client.myGuild.channels.find(c => c.name === 'ask-the-mods')}, ${this.client.myGuild.channels.find(c => c.name === 'ask-a-bot')}, ${this.client.myGuild.channels.find(c => c.name === 'destiny')}, and ${this.client.myGuild.channels.find(c => c.name === 'lounge')}\n\nAfter that, you'll be a full fledged Flermernger -- with full Discord access and eligible to join the in-game-clan! :flermernger:`);
        });
    }
};