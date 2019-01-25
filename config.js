require('dotenv').config();
const convict = require('convict');
const fs = require('fs');

const config = convict({
  env: {
    doc: 'The application environment',
    format: ['prod', 'dev', 'test'],
    default: 'dev',
    env: 'NODE_ENV',
    arg: 'env'
  },
  bot: {
    name: {
      doc: 'Discord bot name',
      format: String,
      default: 'Sunshine',
      env: 'BOT_NAME',
      arg: 'bot-name'
    },
    token: {
      doc: 'Discord bot token',
      format: (val) => {
        if (!/^[a-zA-Z0-9._-]{59}$/.test(val)) throw new Error('Invalid Discord token');
      },
      default: '',
      sensitive: true,
      env: 'TOKEN',
      arg: 'token'
    },
    owners: {
      doc: 'Discord Bot Owner IDs, separated by commas',
      format: String,
      default: '',
      env: 'OWNERS',
      arg: 'owners'
    },
    prefix: {
      doc: 'Default Prefix',
      format: String,
      default: '/',
      env: 'PREFIX',
      arg: 'prefix'
    },
    invite: {
      doc: 'Invite to support server',
      format: String,
      default: '',
      env: 'INVITE',
      arg: 'invite'
    },
    embed: {
      color: {
        doc: 'Embed color',
        format: Number,
        default: 15844367,
        env: 'EMBED_COLOR',
        arg: 'color'
      }
    }
  },
  server: {
    id: {
      doc: 'The ID for the Flerm Server',
      format: String,
      default: '',
      env: 'SERVER_ID',
      arg: 'id'
    },
    name: {
      doc: 'The Name for the Flerm Server',
      format: String,
      default: 'Ermahgerd Flermerngers',
      env: 'SERVER_NAME',
      arg: 'name'
    },
    channels: {
      voice: {
        id: {
          doc: 'The ID for the voice channel',
          format: String,
          default: '',
          env: 'CHANNEL_VOICE_ID',
          arg: 'channel-voice-id'
        },
        name: {
          doc: 'The name for the voice channel',
          format: String,
          default: 'Karaoke Lounge',
          env: 'CHANNEL_VOICE_NAME',
          arg: 'channel-voice-name'
        }
      },
      public: {
        id: {
          doc: 'The ID for the public channel',
          format: String,
          default: '',
          env: 'CHANNEL_PUBLIC_ID',
          arg: 'channel-public-id'
        },
        name: {
          doc: 'The name for the public channel',
          format: String,
          default: 'public',
          env: 'CHANNEL_PUBLIC_NAME',
          arg: 'channel-public-name'
        }
      },
      welcome: {
        id: {
          doc: 'The ID for the welcome channel',
          format: String,
          default: '',
          env: 'CHANNEL_WELCOME_ID',
          arg: 'channel-welcome-id'
        },
        name: {
          doc: 'The name for the welcome channel',
          format: String,
          default: 'welcome',
          env: 'CHANNEL_WELCOME_NAME',
          arg: 'channel-welcome-name'
        }
      },
      modmail: {
        id: {
          doc: 'The ID for the modmail channel',
          format: String,
          default: '',
          env: 'CHANNEL_MODMAIL_ID',
          arg: 'channel-modmail-id'
        },
        name: {
          doc: 'The name for the modmail channel',
          format: String,
          default: 'modmail',
          env: 'CHANNEL_MODMAIL_NAME',
          arg: 'channel-modmail-name'
        }
      },
      meta: {
        id: {
          doc: 'The ID for the meta channel',
          format: String,
          default: '',
          env: 'CHANNEL_META_ID',
          arg: 'channel-meta-id'
        },
        name: {
          doc: 'The name of the meta channel',
          format: String,
          default: 'clan-discussion',
          env: 'CHANNEL_META_NAME',
          arg: 'channel-meta-name'
        }
      },
      membership: {
        id: {
          doc: 'The ID for the membership channel',
          format: String,
          default: '',
          env: 'CHANNEL_MEMBERSHIP_ID',
          arg: 'channel-membership-id'
        },
        name: {
          doc: 'The name of the membership channel',
          format: String,
          default: 'membership',
          env: 'CHANNEL_MEMBERSHIP_NAME',
          arg: 'channel-membership-name'
        }
      },
      roster: {
        id: {
          doc: 'The ID for the roster channel',
          format: String,
          default: '',
          env: 'CHANNEL_ROSTER_ID',
          arg: 'channel-ROSTER-id'
        },
        name: {
          doc: 'The name of the roster channel',
          format: String,
          default: 'roster-changes',
          env: 'CHANNEL_ROSTER_NAME',
          arg: 'channel-ROSTER-name'
        }
      }
    },
    roles: {
      all: {
        id: {
          doc: 'The ID of the important role',
          format: String,
          default: '',
          env: 'ROLE_IMPORTANT_ID',
          arg: 'role-important-id'
        },
        name: {
          doc: 'The name of the important role',
          format: String,
          default: 'important',
          env: 'ROLE_IMPORTANT_NAME',
          arg: 'role-important-name'
        }
      },
      admins: {
        id: {
          doc: 'The ID of the admin role',
          format: String,
          default: '',
          env: 'ROLE_ADMIN_ID',
          arg: 'role-admin-id'
        },
        name: {
          doc: 'The name of the admin role',
          format: String,
          default: 'admins',
          env: 'ROLE_ADMIN_NAME',
          arg: 'role-admin-name'
        }
      },
      mods: {
        id: {
          doc: 'The ID of the mod role',
          format: String,
          default: '',
          env: 'ROLE_MOD_ID',
          arg: 'role-mod-id'
        },
        name: {
          doc: 'The name of the mod role',
          format: String,
          default: 'mods',
          env: 'ROLE_MOD_NAME',
          arg: 'role-mod-name'
        }
      },
      members: {
        id: {
          doc: 'The ID of the member role',
          format: String,
          default: '',
          env: 'ROLE_MEMBER_ID',
          arg: 'role-member-id'
        },
        name: {
          doc: 'The name of the member role',
          format: String,
          default: 'flermerngers',
          env: 'ROLE_MEMBER_NAME',
          arg: 'role-member-name'
        }
      },
      newbies: {
        id: {
          doc: 'The ID of the newbie role',
          format: String,
          default: '',
          env: 'ROLE_NEWBIE_ID',
          arg: 'role-newbie-id'
        },
        name: {
          doc: 'The name of the newbie role',
          format: String,
          default: 'flermlings',
          env: 'ROLE_NEWBIE_NAME',
          arg: 'role-newbie-name'
        }
      }
    }
  },
  db: {
    username: {
      doc: 'Database username',
      format: String,
      default: 'username',
      sensitive: true,
      env: 'DB_USERNAME',
      arg: 'db-username'
    },
    password: {
      doc: 'Database password',
      format: String,
      default: 'password',
      sensitive: true,
      env: 'DB_PASSWORD',
      arg: 'db-password'
    },
    host: {
      doc: 'Database host name/IP',
      format: String,
      default: 'localhost',
      sensitive: true,
      env: 'DB_HOST',
      arg: 'db-host'
    },
    port: {
      doc: 'Database Port',
      format: Number,
      default: 27017,
      env: 'DB_PORT',
      arg: 'db-port'
    },
    name: {
      doc: 'Database Name',
      format: String,
      default: 'Sunshine',
      env: 'DB_NAME',
      arg: 'db-name'
    },
    url: {
      doc: 'Database URL',
      format: String,
      default: 'mongodb://localhost:27017/Sunshine',
      sensitive: true,
      env: 'DB_URL',
      arg: 'db-url'
    },
    dialect: {
      doc: 'Database Dialect',
      format: String,
      default: 'sqlite',
      env: 'DB_DIALECT',
      arg: 'db-dialect'
    }
  }

});
const env = config.get('env');
const configFilePath = `./config/${env}.json`;
if (fs.existsSync(configFilePath)) config.loadFile(configFilePath);
config.validate({ allowed: 'strict' });
module.exports = config.getProperties();
