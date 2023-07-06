const {successEmbed} = require("../../utils/embeds");
const logger = require("../../logger");

module.exports = {
  name: "userinfo",
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
      const member =
        interaction.options.getMember("user") || interaction.member;

      const userNickname = member.nickname;
      const userAvatar = member.user.avatarURL({dynamic: true});
      const userCreatedAt = member.user.createdAt;
      const userJoinedAt = member.joinedAt;
      const userRoles = member.roles.cache
        .filter((role) => role.name !== "@everyone")
        .sort((a, b) => b.position - a.position)
        .map((role) => `${role}`);

      return interaction.reply({
        embeds: [
          successEmbed({
            author: {
              name: member.user.username,
              icon_url: member.user.displayAvatarURL({dynamic: true}),
              url: "",
            },
            thumbnail: {
              url: member.user.displayAvatarURL({dynamic: true}),
            },

            fields: [
              {
                name: "General",
                value: `**Nickname:** ${userNickname}\n**Avatar:** [Click Here](${userAvatar})\n**Created At:** ${userCreatedAt}\n**Joined At:** ${userJoinedAt}\n**Roles:** ${userRoles.join(
                  "\n"
                )}`,
              },
            ],
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
    name: "userinfo",
    description: "Information about a specific user",
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
