const {successEmbed} = require("../../utils/embeds");
const logger = require("../../logger");

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
  description: "Ask the magic 8 ball a question.",
  category: "🎉 Fun",
  permissions: {
    admin: true,
  },
  database: {
    guild: true,
    user: true,
    member: true,
  },

  async execute(client, interaction, data = {}) {
    try {
      interaction.reply({
        embeds: [
          successEmbed({
            title: "🎱 MAGIC 8 BALL 🎱",
            fields: [
              {
                name: "Question:",
                value: interaction.options.getString("question"),
              },
              {
                name: "Answer:",
                value: replies[Math.floor(Math.random() * replies.length)],
              },
            ],
          }),
        ],
        ephemeral: false,
      });
    } catch (error) {
      logger.error(`Error executing '${this.name}' command!`, {
        label: "Command",
        message: error.message,

        data,
      });
    }
  },

  interaction: {
    name: "8ball",
    description: "Ask the magic 8 ball a question.",
    options: [
      {
        type: 3,
        name: "question",
        description: "What is your question?",
        required: true,
      },
    ],
  },
};
