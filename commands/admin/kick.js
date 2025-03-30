const { successEmbed } = require("../../utils/embeds");
const logger = require("../../logger");

module.exports = {
  name: "kick",
  category: "🔨 Moderation",
  description: "Kick a user from the server.",
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

      if (!member) {
        return interaction.reply({
          content: "User not found.",
          ephemeral: true,
        });
      }

      if (!member.kickable) {
        return interaction.reply({
          content: "I cannot kick this user.",
          ephemeral: true,
        });
      }

      await member.kick(reason);

      return interaction.reply({
        embeds: [
          successEmbed({
            title: "User Kicked",
            description: `✅ **${member.user.tag}** has been kicked.\nReason: ${reason}`,
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
    name: "kick",
    description: "Kick a user from the server",
    options: [
      {
        type: 6, // USER
        name: "user",
        description: "The user to kick",
        required: true,
      },
      {
        type: 3, // STRING
        name: "reason",
        description: "Reason for the kick",
        required: false,
      },
    ],
  },
};
