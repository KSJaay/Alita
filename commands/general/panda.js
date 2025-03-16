const { default: axios } = require("axios");
const { basicEmbed } = require("../../tools/embeds");

module.exports = {
  name: "panda",
  description: "A random panda fact",
  usage: "panda",
  category: "general",

  async execute(client, interaction) {
    const fact = await axios.get("https://some-random-api.com/facts/panda");
    const { fact: pandaFact } = fact.data;

    interaction.reply({
      embeds: [
        basicEmbed({
          author: {
            name: "Panda Fact",
            iconURL:
              "https://cdn.discordapp.com/avatars/249955383001481216/274b78039db76b465ab482a46105e53a.webp?size=128",
          },
          description: pandaFact,
        }),
      ],
    });
  },
};
