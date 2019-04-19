const { Provider } = require('discord-akairo');
const { Repository, DeleteResult } = require('typeorm');
const { Guild } = require('discord.js');

class TypeORMProvider extends Provider {
    constructor(repository) {
        super();

        this.repo = repository;
    }

    async init() {
        const settings = await this.repo.find();
        for (const setting of settings) {
            this.items.set(setting.guild, setting.settings);
        }
    }
}

module.exports = TypeORMProvider;