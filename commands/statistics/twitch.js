const {successEmbed} = require("../../utils/embeds");
const logger = require("../../logger");

module.exports = {
  name: "twitch",
  category: "📷 Statistics",
  permissions: {
    admin: true,
  },
  database: {
    guild: true,
    user: true,
    member: true,
  },
  interaction: {},

  async execute(client, interaction, data = {}) {
    try {
    } catch (error) {
      logger.error(`Error executing '${this.name}' command!`, {
        label: "Command",
        message: error.message,

        data,
      });
    }
  },

  interaction: {
    name: "twitch",
    description: "Get information about a twitch account",
    options: [
      {
        type: 3,
        name: "username",
        description: "Name of user's twitch account",
        required: true,
      },
    ],
  },
};
