const { basicEmbed } = require("../../tools/embeds");

module.exports = {
  name: "dice",
  description: "Roll a dice and bet on the outcome.",
  usage: "dice <1-6>",
  category: "games",

  async execute(client, interaction) {
    const n = Math.floor(Math.random() * 6) + 1;

    const guess = interaction.options.getInteger("guess");
    const result =
      guess === n
        ? {
            author: { name: `🎲 Dice` },
            color: 0x00ff00,
            description: `You guessed **${guess}** and the dice rolled **${n}**. You win!`,
          }
        : {
            author: { name: `🎲 Dice` },
            color: 0xff0000,
            description: `You guessed **${guess}** and the dice rolled **${n}**. You lose!`,
          };

    return interaction.reply({
      embeds: [basicEmbed(result)],
      flags: client.interaction_flags,
    });
  },
};
