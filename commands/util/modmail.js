const { Command } = require('../../structures/Structures');
const { MessageEmbed } = require('discord.js');
const moment = require('moment-timezone');
const { stripIndents } = require('common-tags');
const { memberRolesMinusEveryone } = require('../../util/Util');
module.exports = class ModmailCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'modmail',
            guildOnly: false,
            group: 'util',
            memberName: 'modmail',
            argsPromptLimit: 0,
            description: 'For messaging the mods (MUST BE USED IN A DM)',
            args: [
                {
                    key: 'mail',
                    prompt: 'What do you want to send to the mods?',
                    type: 'string'
                }
            ],
            throttling: {
                usages: 1,
                duration: 1800
            }
        });
    }
    async run(message, { mail }) {
        const now = moment();
        const author = message.author;
        const member = this.client.myGuild.member(author);
        if (author.bot) return;
        if (!member) return;
        // Delete the message and DM the user that the command is DM only
        if (message.channel.type !== 'dm') {
            await message.delete();
            return member.say(`Hey! That command must be used in a DM! Please run it again with your message \`\`\`${mail}\`\`\``);
        }
        const modmailEmbed = new MessageEmbed()
            .setColor(member ? member.displayHexColor : this.client.config.bot.embed.color)
            .setAuthor((member && member.nickname) ? member.nickname : author.username,
                author.avatarURL()
            )
            .setDescription(mail);
            try {
                // Send the message back to them
                message.reply({
                    content: stripIndents`:incoming_envelope: I\'m sending your message on to the mods!
                    Mods are happy to help and appreciate the continued responsible use of modmail.`,
                    embed: modmailEmbed
                });
            }
            catch (error) {
                console.error(error);
            }
            // Add additional information, such as join time and roles
            modmailEmbed
            .addBlankField()
            .addField('❯ Joined: ', moment(member.joinedAt).from(now), true)
            .addField('❯ Roles: ', memberRolesMinusEveryone(member, this.client.myGuild))
            .setFooter(author.tag);
            try {
                await this.client.myChannels.modmail.send({
                    content: ':incoming_envelope: New Modmail Message',
                    embed: modmailEmbed
                });
            }
            catch (error) {
                console.error(error);
            }
    }
};