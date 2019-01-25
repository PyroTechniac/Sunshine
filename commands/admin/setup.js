const { Command } = require('../../structures/Structures');
const { stripIndents } = require('common-tags');
const { MessageEmbed } = require('discord.js');
const client = require('../../server/client');
const channelNames = [
  'membership',
  'meta',
  'modmail',
  'public',
  'roster',
  'welcome',
];
const roleNames = [
  'admins',
  'mods',
  'members',
  'newbies',
  'all',
];
module.exports = class SetupCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'setup',
      group: 'admin',
      memberName: 'setup',
      guildOnly: true,
      description: 'For setting up the bots channels and roles',
      args: [
        {
          key: 'membership',
          prompt: 'Please #-link the membership channel',
          type: 'channel',
        },
        {
          key: 'meta',
          prompt: 'Please #-link the meta channel',
          type: 'channel',
        },
        {
          key: 'modmail',
          prompt: 'Please #-link the modmail channel',
          type: 'channel',
        },
        {
          key: 'newbie',
          prompt: 'Please #-link the public channel',
          type: 'channel',
        },
        {
          key: 'roster',
          prompt: 'Please #-link the roster changes channel',
          type: 'channel',
        },
        {
          key: 'welcome',
          prompt: 'Please #-link the welcome channel',
          type: 'channel',
        },
        {
          key: 'admins',
          prompt: 'Please @-mention the admins role',
          type: 'role',
        },
        {
          key: 'mods',
          prompt: 'Please @-mention the mods role',
          type: 'role',
        },
        {
          key: 'members',
          prompt: 'Please @-mention the members role',
          type: 'role',
        },
        {
          key: 'newbies',
          prompt: 'Please @-mention the newbies role',
          type: 'role',
        },
        {
          key: 'all',
          prompt: 'Please @-mention the all role (NOT @everyone)',
          type: 'role',
        },
        {
          key: 'vouchers',
          prompt: 'What is the voucher target for flermlings?',
          type: 'integer',
        },
      ],
    });
  }
  hasPermission(message) {
    if (message.member.hasPermission('ADMINISTRATOR')) return true;
    return 'You do not have permission to use the setup command!';
  }
  async reassignChannel(name, newChannel) {
    return this.client.myChannels[name] = await newChannel;
  }
  async reassignRole(name, newRole) {
    return this.client.myRoles[name] = await newRole;
  }
  async run(message, { membership, meta, modmail, newbie, roster, welcome, admins, mods, members, newbies, all, vouchers }) {
    // console.log(this.client.myChannels)
    const channels = [membership, meta, modmail, newbie, roster, welcome];
    for (let i = 0; i < channels.length; i++) {
      this.reassignChannel(channelNames[i], channels[i]);
    }
    const roles = [admins, mods, members, newbies, all];
    for (let i = 0; i < roles.length; i++) {
      this.reassignRole(roleNames[i], roles[i]);
    }
    await this.client.provider.set('global', 'membership', membership.id);
    await this.client.provider.set('global', 'meta', meta.id);
    await this.client.provider.set('global', 'modmail', modmail.id);
    await this.client.provider.set('global', 'public', newbie.id);
    await this.client.provider.set('global', 'roster', roster.id);
    await this.client.provider.set('global', 'welcome', welcome.id);
    await this.client.provider.set('global', 'admins', admins.id);
    await this.client.provider.set('global', 'mods', mods.id);
    await this.client.provider.set('global', 'members', members.id);
    await this.client.provider.set('global', 'newbies', newbies.id);
    await this.client.provider.set('global', 'all', all.id);
    await this.client.provider.set('global', 'voucherTarget', vouchers);
    const embed = await new MessageEmbed()
      .setColor(this.client.config.bot.embed.color)
      .setDescription('**Current Server Settings:**')
      .addField('❯ Channels:', stripIndents`
            Membership: ${this.client.myChannels.membership}
            Meta: ${this.client.myChannels.meta}
            Modmail: ${this.client.myChannels.modmail}
            Public: ${this.client.myChannels.public}
            Roster Changes: ${this.client.myChannels.roster}
            Welcome: ${this.client.myChannels.welcome}
            `, true)
      .addField('❯ Roles:', stripIndents`
            Admins: ${this.client.myRoles.admins}
            Mods: ${this.client.myRoles.mods}
            Members: ${client.myRoles.members}
            Newbies: ${this.client.myRoles.newbies}
            All: ${this.client.myRoles.all}
            `, true)
      .addField('❯ Voucher Target: ', client.provider.get('global', 'voucherTarget', '5'), true);
    return message.embed(embed);
  }
};
