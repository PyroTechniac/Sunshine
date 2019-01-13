const { Command } = require("../../structures/Structures")
const config = require("../../config")
const { stripIndents } = require('common-tags')
const { MessageEmbed } = require("discord.js")
module.exports = class SetupCommand extends Command {
    constructor(client) {
        super(client, {
            name: "setup",
            ownerOnly: true,
            group: "admin",
            memberName: "setup",
            guildOnly: true,
            description: "For setting up the bots channels and roles",
            args: [
                {
                    key: "membership",
                    prompt: "Please #-link the membership channel",
                    type: "channel"
                },
                {
                    key: "meta",
                    prompt: "Please #-link the meta channel",
                    type: "channel"
                },
                {
                    key: "modmail",
                    prompt: "Please #-link the modmail channel",
                    type: "channel"
                },
                {
                    key: "newbie",
                    prompt: "Please #-link the public channel",
                    type: "channel"
                },
                {
                    key: 'roster',
                    prompt: "Please #-link the roster changes channel",
                    type: "channel"
                },
                {
                    key: 'welcome',
                    prompt: "Please #-link the welcome channel",
                    type: "channel"
                },
                {
                    key: "admins",
                    prompt: "Please @-mention the admins role",
                    type: "role"
                },
                {
                    key: "mods",
                    prompt: "Please @-mention the mods role",
                    type: "role"
                },
                {
                    key: "members",
                    prompt: "Please @-mention the members role",
                    type: "role"
                },
                {
                    key: "newbies",
                    prompt: "Please @-mention the newbies role",
                    type: "role"
                },
                {
                    key: "all",
                    prompt: "Please @-mention the all role (NOT @everyone)",
                    type: 'role'
                },
                {
                    key: "vouchers",
                    prompt: "What is the voucher target for flermlings?",
                    type: "integer"
                }
            ]
        })
    }
    async run(message, { membership, meta, modmail, newbie, roster, welcome, admins, mods, members, newbies, all, vouchers }) {
        this.client.myChannels.membership = membership
        this.client.myChannels.meta = meta
        this.client.myChannels.modmail = modmail
        this.client.myChannels.public = newbie
        this.client.myChannels.roster = roster
        this.client.myChannels.welcome = welcome
        this.client.myRoles.admins = admins
        this.client.myRoles.mods = mods
        this.client.myRoles.members = members
        this.client.myRoles.newbies = newbies
        this.client.myRoles.all = all

        const embed = new MessageEmbed()
            .setColor(config.bot.embed.color)
            .setDescription("**Current Server Settings:**")
            .addField("❯ Channels:", stripIndents`
            Membership: ${this.client.myChannels.membership}
            Meta: ${this.client.myChannels.meta}
            Modmail: ${this.client.myChannels.modmail}
            Public: ${this.client.myChannels.public}
            Roster Changes: ${this.client.myChannels.roster}
            Welcome: ${this.client.myChannels.roster}
            `, true)
            .addField('❯ Roles:', stripIndents`
            Admins: ${this.client.myRoles.admins}
            Mods: ${this.client.myRoles.mods}
            Members: ${this.client.myRoles.members}
            Newbies: ${this.client.myRoles.newbies}
            All: ${this.client.myRoles.all}
            `, true)
            .addField('❯ Voucher Target: ', vouchers, true)
            return message.embed(embed)
    }
}
