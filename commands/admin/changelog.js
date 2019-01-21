const { Command } = require('../../structures/Structures');
const { MessageEmbed } = require('discord.js');
const request = require('node-superfetch');
const { base64, shorten } = require('../../util/Util');
const { GITHUB_USERNAME, GITHUB_PASSWORD, SUNSHINE_GITHUB_REPO_USERNAME, SUNSHINE_GITHUB_REPO_NAME } = process.env;
module.exports = class ChangelogCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'changelog',
            aliases: ['updates', 'commits'],
            group: 'admin',
            memberName: 'changelog',
            description: 'Responds with the bot\'s latest 10 commits.',
            guarded: true,
        });
    }
    async run(message) {
        const { body } = await request
            .get(`https://api.github.com/repos/${SUNSHINE_GITHUB_REPO_USERNAME}/${SUNSHINE_GITHUB_REPO_NAME}/commits`)
            .set({ Authorization: `Basic ${base64(`${GITHUB_USERNAME}:${GITHUB_PASSWORD}`)}` });
        const commits = body.slice(0, 10);
        const embed = new MessageEmbed()
        .setTitle(`[${SUNSHINE_GITHUB_REPO_NAME}:master] Latest 10 commits`)
        .setColor(0x7289DA)
        .setURL(`https://github.com/${SUNSHINE_GITHUB_REPO_USERNAME}/${SUNSHINE_GITHUB_REPO_NAME}/commits/master`)
        .setDescription(commits.map((commit) => {
            const hash = `[\`${commit.sha.slice(0, 7)}\`](${commit.html_url})`;
            return `${hash} ${shorten(commit.commit.message.split('\n')[0], 50)} - ${commit.commit.author.name}`;
        }).join('\n'));
        return message.embed(embed);
    }
};