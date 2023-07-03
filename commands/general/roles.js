const {successEmbed} = require("../../utils/embeds");

module.exports = {
  name: "roles",
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
      const guildRoles = interaction.guild.roles.cache
        .filter((role) => role.name !== "@everyone")
        .sort((a, b) => b.position - a.position)
        .map((role) => `${role}`);

      return interaction.reply({
        embeds: [
          successEmbed({
            title: "Roles",
            description: `**${interaction.guild.name}** has **${guildRoles.length}** roles`,
            fields: [
              {
                name: "Roles",
                value: guildRoles.join("\n"),
              },
            ],
          }),
        ],
      });
    } catch (error) {
      logger.error(`Error executing '${this.name}' command!`, {
        label: "Command",
        message: error.message,
        stack: error.stack,
        data,
      });
    }
  },

  interaction: {
    name: "roles",
    description: "Check all the available roles in the server",
    options: [],
  },
};
