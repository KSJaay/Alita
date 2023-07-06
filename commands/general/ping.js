const logger = require("../../logger");

module.exports = {
  name: "ping",
  category: "📋 General",
  permissions: {
    admin: true,
  },
  database: {
    guild: true,
    user: true,
    member: true,
  },

  async execute(client, interaction, data = {}) {
    try {
      interaction.reply({
        content: "Pong!\n\nAPI Latency is `" + client.ws.ping + "ms`.",
        ephemeral: false,
      });
    } catch (error) {
      logger.error(`Error executing '${this.name}' command!`, {
        label: "Command",
        message: error.message,

        data,
      });
    }
  },

  interaction: {
    name: "ping",
    description: "Check the current api latency",
    options: [],
  },
};
