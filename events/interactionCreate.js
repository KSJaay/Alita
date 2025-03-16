// import local files
const logger = require("../logger");

async function run(client, interaction) {
  try {
    if (!interaction.inCachedGuild()) {
      return;
    }

    if (interaction.isChatInputCommand()) {
      const command = client.commands.get(interaction.commandName);
      if (!command) return;

      return command.execute(client, interaction);
    }

    if (interaction.isButton()) {
      const [commandName] = interaction.customId.split("_");

      const command = client.buttons.get(commandName);

      if (!command) {
        return interaction.reply({
          content: "Button not found.",
          flags: client.interaction_flags,
        });
      }

      return command.execute(client, interaction);
    }
  } catch (error) {
    logger.error("interactionCreate", {
      name: "interactionCreate",
      label: "Event",
      message: error?.message,
      stack: error?.stack,
      options: interaction.options,
    });

    if (!interaction.replied) {
      return interaction.reply({
        content: `Issue occurred while running command. Please try again.`,
        ephemeral: true,
      });
    }
  }
}

module.exports = run;
