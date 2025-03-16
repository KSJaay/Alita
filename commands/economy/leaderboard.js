const { MessageFlags } = require("discord.js");
const { fetchGuildLeaderboard } = require("../../database/queries");
const { basicEmbed } = require("../../tools/embeds");

module.exports = {
  name: "leaderboard",
  description: "Show the leaderboard of the server.",
  usage: "leaderboard",
  category: "economy",

  async execute(client, interaction) {
    try {
      const users = await fetchGuildLeaderboard();

      if (users.length === 0) {
        return interaction.reply({
          content: "There are no users in the leaderboard.",
          flags: client.interaction_flags,
        });
      }

      const text = users
        .map(
          (user, index) =>
            `**#${index + 1}** <@${user.id}> - ${user.balance} coins`
        )
        .join("\n\n");

      return interaction.reply({
        embeds: [
          basicEmbed({
            author: { name: "🏆 Leaderboard" },
            description: text,
            footer: { text: "Use /search to get some coins!" },
          }),
        ],
        flags: client.interaction_flags,
      });
    } catch (error) {
      console.log(interaction.user.id, error);
    }
  },
};
