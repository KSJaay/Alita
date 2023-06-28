const {successEmbed} = require("../../utils/embeds");
const logger = require("../../logger");

const messageSettings = (setting = {}) => {
  if (!setting.enabled) return "Enabled: ❌";

  const {channel, message} = setting;

  return `Enabled: ✅\nChannel: <#${channel}>\nMessage: ${message}`;
};

module.exports = {
  name: "settings",
  category: "⚙️ Admin",
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
      return interaction.reply({
        embeds: [
          successEmbed({
            description: `Use admins commands to change these settings`,
            fields: [
              {
                name: `Welcome settings`,
                value: messageSettings(data.guild.welcome),
                inline: true,
              },
              {
                name: `Goodbye settings`,
                value: messageSettings(data.guild.goodbye),
                inline: true,
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
