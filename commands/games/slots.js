const { basicEmbed } = require("../../tools/embeds");

const slotItems = ["🍇", "🍉", "🍊", "🍎", "🍓", "🍒"];

module.exports = {
  name: "slots",
  description: "Play a game of slots!",
  usage: "slots <bet>",
  category: "games",

  async execute(client, interaction) {
    let win = false;

    let slots = [];

    for (i = 0; i < 3; i++) {
      slots[i] = [
        Math.floor(Math.random() * slotItems.length),
        Math.floor(Math.random() * slotItems.length),
        Math.floor(Math.random() * slotItems.length),
      ];
    }

    const number = slots[1];

    if (number[0] == number[1] && number[1] == number[2]) {
      win = true;
    } else if (
      number[0] == number[1] ||
      number[0] == number[2] ||
      number[1] == number[2]
    ) {
      win = true;
    }

    if (win) {
      interaction.reply({
        embeds: [
          basicEmbed({
            author: { name: `🎰 Slots` },
            description: slots
              .map((s) => s.map((i) => slotItems[i]).join(" "))
              .join("\n"),
          }),
        ],
        flags: client.interaction_flags,
      });
    } else {
      interaction.reply({
        embeds: [
          basicEmbed({
            author: { name: `🎰 Slots` },
            description: slots
              .map((s) => s.map((i) => slotItems[i]).join(" "))
              .join("\n"),
            color: 15158332,
          }),
        ],
        flags: client.interaction_flags,
      });
    }
  },
};
