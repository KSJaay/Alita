const { successEmbed } = require("../../utils/embeds");
const logger = require("../../logger");

module.exports = {
  name: "ban",
  category: "🔨 Moderation",
  description: "Ban a user from the server.",
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

      if (!member.bannable) {
        return interaction.reply({
          content: "I cannot ban this user.",
          ephemeral: true,
        });
      }

      await member.ban({ reason });

      return interaction.reply({
        embeds: [
          successEmbed({
            title: "User Banned",
            description: `✅ **${member.user.tag}** has been banned.\nReason: ${reason}`,
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
    name: "ban",
    description: "Ban a user from the server",
    options: [
      {
        type: 6, // USER
        name: "user",
        description: "The user to ban",
        required: true,
      },
      {
        type: 3, // STRING
        name: "reason",
        description: "Reason for the ban",
        required: false,
      },
    ],
  },
};
