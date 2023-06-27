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
  interaction: {},

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
            description: `**${interaction.guild.name}** has **${guildRoles.length}**`,
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
};
