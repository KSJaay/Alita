// import node_modules
const {InteractionType, PermissionsBitField} = require("discord.js");

// import local files
const {fetchOrCreateGuild} = require("../database/queries/guild");
const logger = require("../logger");

async function run(client, interaction) {
  try {
    if (interaction.isChatInputCommand() && interaction.inCachedGuild()) {
      if (interaction.type === InteractionType.ApplicationCommand) {
        const command = client.commands.get(interaction.commandName);

        if (!command) {
          return interaction.reply({
            content: "Unable to find this command.",
            ephemeral: true,
          });
        }

        let guild_data = {};

        if (command.database?.guild) {
          guild_data = await fetchOrCreateGuild(interaction.guildId);
        }

        if (
          command.permissions?.admin &&
          !interaction.memberPermissions.has(
            PermissionsBitField.Flags.Administrator
          )
        ) {
          return interaction.reply({
            content: "You do not have permission to run this command.",
            ephemeral: true,
          });
        }

        const data = {guild: guild_data};

        return command.execute(client, interaction, data);
      }
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
