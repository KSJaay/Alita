const {
  randomRpsMessages,
  getBotMessage,
} = require("../../constants/commands/rps");
const { basicEmbed } = require("../../tools/embeds");

const abbrWeapon = { r: "rock", p: "paper", s: "scissors" };
const icons = { rock: "🪨", paper: "📄", scissors: "✂️" };

const rpsChoices = ["rock", "paper", "scissors"];

const getWaitingMsg = (opponent, challenger) => {
  let msg = `You have chosen to play rock-paper-scissors against <@${challenger.userId}>!\n\nCurrently waiting for:`;

  if (!opponent.weapon) {
    msg += `\n<@${opponent.userId}> to choose an option`;
  }

  if (!challenger.weapon) {
    msg += `\n<@${challenger.userId}> to choose an option.`;
  }

  return msg;
};

const getRpsGame = (client, uniqueId) => {
  const rpsGames = client.games.get("rps") || {};
  return rpsGames[uniqueId];
};

const deleteRpsGame = (client, uniqueId) => {
  const rpsGames = client.games.get("rps") || {};
  delete rpsGames[uniqueId];
  client.games.set("rps", rpsGames);
};

const getRandomMessage = (winner, loser) => {
  return randomRpsMessages[Math.floor(Math.random() * randomRpsMessages.length)]
    .replace("{winner}", `<@${winner}>`)
    .replace("{loser}", `<@${loser}>`);
};

const getRpsWinner = (
  challengerWeapon,
  opponentWeapon,
  challengerId,
  opponentId,
  isBot
) => {
  if (challengerWeapon === opponentWeapon)
    return "It's a tie, I'm not even gonna write a cool message.";

  const win =
    (challengerWeapon === "rock" && opponentWeapon === "scissors") ||
    (challengerWeapon === "paper" && opponentWeapon === "rock") ||
    (challengerWeapon === "scissors" && opponentWeapon === "paper");

  if (isBot) {
    return getBotMessage(!win);
  }

  return win
    ? getRandomMessage(challengerId, opponentId)
    : getRandomMessage(opponentId, challengerId);
};

module.exports = {
  name: "rps",

  async execute(client, interaction) {
    try {
      const reply = (content) => {
        return interaction.update(content);
      };

      const [_, type, action] = interaction.customId.split("_");

      const gameInfo = getRpsGame(client, action);

      if (!gameInfo) {
        return reply({
          content: "Unable to find the given game, please start a new game!",
          embeds: [],
          components: [],
        });
      }

      if (
        gameInfo.challenger?.userId !== interaction.user.id &&
        gameInfo.opponent?.userId !== interaction.user.id
      ) {
        return interaction.reply({
          content:
            "You can't participate in this game, you can start a new game using `/rps`.",
          flags: client.interaction_flags,
        });
      }

      if (
        gameInfo.challenger?.userId === interaction.user.id &&
        !gameInfo.challenger.weapon
      ) {
        gameInfo.challenger.weapon = abbrWeapon[type];
      } else if (
        gameInfo.opponent?.userId === interaction.user.id &&
        !gameInfo.opponent.weapon
      ) {
        gameInfo.opponent.weapon = abbrWeapon[type];
      }

      if (gameInfo.isBot && gameInfo.challenger.weapon) {
        const botChoice =
          rpsChoices[Math.floor(Math.random() * rpsChoices.length)];

        const winnerMsg = getRpsWinner(
          gameInfo.challenger.weapon,
          botChoice,
          gameInfo.challenger.userId,
          client.user.id,
          true
        );

        deleteRpsGame(client, action);

        return reply({
          embeds: [
            basicEmbed({
              author: { name: "Rock-Paper-Scissors" },
              description: `${winnerMsg}\n\nChoices:\n<@${
                gameInfo.challenger.userId
              }> ${icons[gameInfo.challenger.weapon]}\n<@${client.user.id}>: ${
                icons[botChoice]
              }`,
              color: 16231462,
            }),
          ],
          components: [],
        });
      }

      if (!gameInfo.opponent.weapon || !gameInfo.challenger?.weapon) {
        return reply({
          embeds: [
            basicEmbed({
              author: { name: "Rock-Paper-Scissors" },
              description: getWaitingMsg(
                gameInfo.opponent,
                gameInfo.challenger
              ),
              color: 16231462,
            }),
          ],
        });
      }

      const winnerMsg = getRpsWinner(
        gameInfo.challenger.weapon,
        gameInfo.opponent.weapon,
        gameInfo.challenger.userId,
        gameInfo.opponent.userId
      );

      deleteRpsGame(client, action);

      return reply({
        embeds: [
          basicEmbed({
            author: { name: "Rock-Paper-Scissors" },
            description: `${winnerMsg}\n\nChoices:\n<@${
              gameInfo.challenger.userId
            }> ${icons[gameInfo.challenger.weapon]}\n<@${
              gameInfo.opponent.userId
            }>: ${icons[gameInfo.opponent.weapon]}`,
            color: 16231462,
          }),
        ],
        components: [],
      });
    } catch (error) {
      console.log(`${this.name} buttons`, {
        message: error?.message,
        stack: error?.stack,
      });
    }
  },
};
