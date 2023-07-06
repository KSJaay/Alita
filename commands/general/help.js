const {successEmbed} = require("../../utils/embeds");
const logger = require("../../logger");

module.exports = {
  name: "help",
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
      const commandName = interaction.options.getString("command");

      if (commandName) {
        const command = client.commands.get(commandName);
        if (command) {
          return interaction.reply({
            embeds: [
              successEmbed({
                title: command.name,
                description: command.description,
                fields: [
                  {
                    name: "Category",
                    value: command.category,
                    inline: true,
                  },
                  {
                    name: "Permissions",
                    value: JSON.stringify(command.permissions),
                    inline: true,
                  },
                ],
              }),
            ],
          });
        }
      }

      const categories = client.commands
        .map((command) => command.category)
        .filter((value, index, self) => self.indexOf(value) === index);

      const fields = categories.map((category) => ({
        name: category,
        value: client.commands
          .filter((command) => command.category === category)
          .map((command) => `[${command.name}](https://kyubot.com)`)
          .join(", "),
        inline: false,
      }));

      return interaction.reply({
        embeds: [
          successEmbed({
            title: "Commands",
            description: "List of all the available commands",
            fields,
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
    name: "help",
    description: "List of all the available commands",
    options: [
      {
        type: 3,
        name: "command",
        description: "Get information about a specific command",
        required: false,
      },
    ],
  },
};
