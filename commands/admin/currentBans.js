const {successEmbed} = require("../../utils/embeds");
const logger = require("../../logger");

module.exports = {
  name: "currentbans",
  category: "⚙️ Admin",
  permissions: {
    admin: true,
  },
  database: {
    guild: false,
    user: false,
    member: false,
  },

  async execute(client, interaction, data = {}) {
    try {
      const bans = await interaction.guild.bans.fetch();

      return interaction.reply({
        embeds: [
          successEmbed({
            description: `Current bans: ${bans.size}\n${bans
              .map((ban) => `${ban.user.tag} (${ban.user.id})`)
              .join("\n")
              .slice(0, 1948)}`,
          }),
        ],
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
    name: "currentbans",
    description: "Get a list of current bans",
    options: [],
  },
};
