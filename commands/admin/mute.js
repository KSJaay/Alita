const { successEmbed } = require("../../utils/embeds");
const logger = require("../../logger");

module.exports = {
  name: "mute",
  category: "🔨 Moderation",
  description: "Mute a user in the server.",
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
      const member = interaction.options.getMember("user");
      const reason = interaction.options.getString("reason") || "No reason provided";
      const muteRole = interaction.guild.roles.cache.find(role => role.name.toLowerCase() === "muted");

      if (!member) {
        return interaction.reply({
          content: "User not found.",
          ephemeral: true,
        });
      }

      if (!muteRole) {
        return interaction.reply({
          content: "No 'Muted' role found. Please create one and try again.",
          ephemeral: true,
        });
      }

      if (member.roles.cache.has(muteRole.id)) {
        return interaction.reply({
          content: "This user is already muted.",
          ephemeral: true,
        });
      }

      await member.roles.add(muteRole);

      return interaction.reply({
        embeds: [
          successEmbed({
            title: "User Muted",
            description: `✅ **${member.user.tag}** has been muted.\nReason: ${reason}`,
          }),
        ],
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
    name: "mute",
    description: "Mute a user in the server",
    options: [
      {
        type: 6, // USER
        name: "user",
        description: "The user to mute",
        required: true,
      },
      {
        type: 3, // STRING
        name: "reason",
        description: "Reason for the mute",
        required: false,
      },
    ],
  },
};
