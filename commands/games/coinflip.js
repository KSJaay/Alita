const { basicEmbed } = require("../../tools/embeds");

module.exports = {
  name: "coinflip",
  description: "Flip a coin and bet on the outcome.",
  usage: "coinflip <heads/tails>",
  category: "games",

  async execute(client, interaction) {
    const n = Math.floor(Math.random() * 2) === 0 ? "heads" : "tails";

    const guess = interaction.options.getString("side");
    const result =
      guess === n
        ? {
            author: { name: `🪙 Coinflip` },
            color: 0x00ff00,
            description: `You guessed **${guess}** and the coin landed on **${n}**. You win!`,
          }
        : {
            author: { name: `🪙 Coinflip` },
            color: 0xff0000,
            description: `You guessed **${guess}** and the coin landed on **${n}**. You lose!`,
          };

    return interaction.reply({
      embeds: [basicEmbed(result)],
      flags: client.interaction_flags,
    });
  },
};
