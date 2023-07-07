const {successEmbed} = require("../../utils/embeds");
const logger = require("../../logger");
const {updateGuild} = require("../../database/queries/guild");
const replacers = require("../../utils/replacers");

module.exports = {
  name: "welcome",
  category: "⚙️ Admin",
  description: "",
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
      const subcommand = interaction.options.getSubcommand();

      if (subcommand === "set") {
        const channel = interaction.options.getChannel("channel");
        data.guild.welcome.channel = channel.id;
        await updateGuild(interaction.guildId, data.guild);

        return interaction.reply({
          embeds: [
            successEmbed({
              title: "Welcome channel set",
              description: `Welcome messages will be sent to ${channel}`,
            }),
          ],
          ephemeral: false,
        });
      } else if (subcommand === "customise") {
        const message = interaction.options.getString("description");
        if (message.length > 1200) {
          return interaction.reply({
            content: "The description cannot be longer than 1200 characters.",
            ephemeral: false,
          });
        }
        data.guild.welcome.message = message;
        await updateGuild(interaction.guildId, data.guild);

        return interaction.reply({
          embeds: [
            successEmbed({
              title: "Welcome message customised",
              description: `Welcome message has been set to:\n\n${message}`,
            }),
          ],
          ephemeral: false,
        });
      } else if (subcommand === "disable") {
        data.guild.welcome.channel = null;
        data.guild.welcome.message = null;
        await updateGuild(interaction.guildId, data.guild);

        return interaction.reply({
          embeds: [
            successEmbed({
              title: "Welcome messages disabled",
              description: `Welcome messages have been disabled.`,
            }),
          ],
          ephemeral: false,
        });
      } else if (subcommand === "test") {
        const channel = interaction.guild.channels.cache.get(
          data.guild.welcome.channel
        );

        if (!channel) {
          return interaction.reply({
            content: "The channel is not set.",
            ephemeral: false,
          });
        }

        const message = replacers(
          data.guild.goodbye.message,
          interaction.user,
          interaction.guild
        );

        const embed = successEmbed({
          title: "Goodbye!",
          description: message,
        });

        channel.send({embeds: [embed]});

        interaction.reply({
          content: "Test message sent.",
          ephemeral: false,
        });
      }
    } catch (error) {
      logger.error(`Error executing '${this.name}' command!`, {
        label: "Command",
        message: error.message,

        data,
      });
    }
  },

  interaction: {
    name: "welcome",
    description: "Send a welcome message when a user joins the server.",
    options: [
      {
        type: 1,
        name: "set",
        description:
          "Select the channel where you want to send the welcome message",
        options: [
          {
            type: 7,
            name: "channel",
            description: "Select a channel to send welcome messages",
            required: true,
          },
        ],
      },
      {
        type: 1,
        name: "customise",
        description: "Customise the embed for welcome messages",
        options: [
          {
            type: 3,
            name: "description",
            description: "Enter the description for the welcome message",
            required: true,
          },
        ],
      },
      {
        type: 1,
        name: "disable",
        description: "Disable welcome messages from being sent",
      },
      {
        type: 1,
        name: "test",
        description: "Test welcome messages",
      },
    ],
  },
};
