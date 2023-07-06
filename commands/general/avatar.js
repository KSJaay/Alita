const {successEmbed} = require("../../utils/embeds");
const logger = require("../../logger");

module.exports = {
  name: "avatar",
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
      const user = interaction.options.getUser("user") || interaction.user;
      const avatarUrl = user.displayAvatarURL({dynamic: true, size: 2048});

      return interaction.reply({
        embeds: [
          successEmbed({
            title: `${user.username}'s avatar`,
            url: avatarUrl,
            image: {
              url: avatarUrl,
            },
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
    name: "avatar",
    description: "Get a specific users avatar",
    options: [
      {
        type: 6,
        name: "user",
        description: "Mention a user you want to find",
        required: false,
      },
    ],
  },
};
