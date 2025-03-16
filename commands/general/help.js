const { basicEmbed } = require("../../tools/embeds");

module.exports = {
  name: "help",
  description: "Open a lootbox",
  usage: "help [command]",
  category: "general",

  async execute(client, interaction) {
    const commandName = interaction.options.getString("command");

    if (!commandName) {
      const economy = client.commands
        .filter(({ category }) => category === "economy")
        .map(({ name }) => name);
      const games = client.commands
        .filter(({ category }) => category === "games")
        .map(({ name }) => name);
      const general = client.commands
        .filter(({ category }) => category === "general")
        .map(({ name }) => name);

      return interaction.reply({
        embeds: [
          basicEmbed({
            description: `Here's a list of commands available:\n\n💵 **Economy**\`\`\`${economy.join(
              ", "
            )}\`\`\`\n🎮 **Games**\`\`\`${games.join(
              ", "
            )}\`\`\`\n📖 **General**\`\`\`${general.join(", ")}\`\`\``,
          }),
        ],
        flags: client.interaction_flags,
      });
    }

    const command = client.commands.get(commandName);

    return interaction.reply({
      embeds: [
        basicEmbed({
          description: `${command.description}:\n\nUsage\`\`\`${command.usage}\`\`\``,
        }),
      ],
      flags: client.interaction_flags,
    });
  },
};
