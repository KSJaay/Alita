const { basicEmbed } = require("../../tools/embeds");

const replies = [
  "Maybe.",
  "Certainly not.",
  "I hope so.",
  "Not in your wildest dreams.",
  "There is a good chance.",
  "Quite likely.",
  "I think so.",
  "I hope not.",
  "I hope so.",
  "Never!",
  "Pfft.",
  "Sorry, bucko.",
  "Hell, yes.",
  "Hell to the no.",
  "The future is bleak.",
  "The future is uncertain.",
  "I would rather not say.",
  "Who cares?",
  "Possibly.",
  "Never, ever, ever.",
  "There is a small chance.",
  "Yes!",
  "lol no.",
  "There is a high probability.",
  "What difference does it makes?",
  "Not my problem.",
  "Ask someone else.",
];

module.exports = {
  name: "8ball",
  description: "Ask the magic 8ball a question!",
  usage: "8ball",
  category: "games",

  async execute(client, interaction) {
    try {
      const results = replies[Math.floor(Math.random() * replies.length)];
      const question = interaction.options.getString("question");

      interaction.reply({
        embeds: [
          basicEmbed({
            author: {
              name: "🎱 8ball",
            },
            fields: [
              { name: "Question", value: question },
              { name: "Answer", value: results },
            ],
          }),
        ],
      });
    } catch (error) {
      console.log(interaction.user.id, error);
    }
  },
};
