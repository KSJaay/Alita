const {successEmbed} = require("../../utils/embeds");
const logger = require("../../logger");

module.exports = {
  name: "rps",
  description: "Play a game of rock, paper sissors.",
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
      const options = ["rock", "paper", "scissors"];
      const userChoice = interaction.options.getString("weapon");

      const botChoice = options[Math.floor(Math.random() * options.length)];

      let result;

      if (userChoice === botChoice) {
        return interaction.reply({
          embeds: [
            successEmbed({
              title: "🎲 ROCK, PAPER, SCISSORS 🎲",
              fields: [
                {
                  name: "Your Choice:",
                  value: userChoice,
                },
                {
                  name: "Bot's Choice:",
                  value: botChoice,
                },
                {
                  name: "Result:",
                  value: "It's a tie!",
                },
              ],
            }),
          ],
          ephemeral: false,
        });
      } else if (userChoice === "rock") {
        if (botChoice === "paper") {
          result = "lost";
        } else {
          result = "won";
        }

        if (result === "won") {
          return interaction.reply({
            embeds: [
              successEmbed({
                title: "🎲 ROCK, PAPER, SCISSORS 🎲",
                fields: [
                  {
                    name: "Your Choice:",
                    value: userChoice,
                  },
                  {
                    name: "Bot's Choice:",
                    value: botChoice,
                  },
                  {
                    name: "Result:",
                    value: "You won!",
                  },
                ],
              }),
            ],
            ephemeral: false,
          });
        } else {
          return interaction.reply({
            embeds: [
              successEmbed({
                title: "🎲 ROCK, PAPER, SCISSORS 🎲",
                fields: [
                  {
                    name: "Your Choice:",
                    value: userChoice,
                  },
                  {
                    name: "Bot's Choice:",
                    value: botChoice,
                  },
                  {
                    name: "Result:",
                    value: "You lost!",
                  },
                ],
              }),
            ],
            ephemeral: false,
          });
        }
      } else if (userChoice === "paper") {
        if (botChoice === "scissors") {
          result = "lost";
        } else {
          result = "won";
        }

        if (result === "won") {
          return interaction.reply({
            embeds: [
              successEmbed({
                title: "🎲 ROCK, PAPER, SCISSORS 🎲",
                fields: [
                  {
                    name: "Your Choice:",
                    value: userChoice,
                  },
                  {
                    name: "Bot's Choice:",
                    value: botChoice,
                  },
                  {
                    name: "Result:",
                    value: "You won!",
                  },
                ],
              }),
            ],
            ephemeral: false,
          });
        } else {
          return interaction.reply({
            embeds: [
              successEmbed({
                title: "🎲 ROCK, PAPER, SCISSORS 🎲",
                fields: [
                  {
                    name: "Your Choice:",
                    value: userChoice,
                  },
                  {
                    name: "Bot's Choice:",
                    value: botChoice,
                  },
                  {
                    name: "Result:",
                    value: "You lost!",
                  },
                ],
              }),
            ],
            ephemeral: false,
          });
        }
      }
    } catch (error) {
      logger.error(`Error executing '${this.name}' command!`, {
        label: "Command",
        message: error.message,

        data,
      });
    }
  },

  interaction: {
    name: "rps",
    description: "Play a game of rock, paper, scissors.",
    options: [
      {
        type: 3,
        name: "weapon",
        description: "Choose your weapon?",
        required: true,
        choices: [
          {
            name: "Rock",
            value: "rock",
          },
          {
            name: "Paper",
            value: "paper",
          },
          {
            name: "Scissors",
            value: "scissors",
          },
        ],
      },
    ],
  },
};
