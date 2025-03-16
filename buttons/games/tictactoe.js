const { basicEmbed } = require("../../tools/embeds");
const createButtons = require("../../tools/buttons");

const getButtons = (filledSlots, uniqueId) => [
  createButtons([
    {
      custom_id: `ttt_0_${uniqueId}`,
      label: "1",
      style: 1,
      disabled: filledSlots.includes("0"),
    },
    {
      custom_id: `ttt_1_${uniqueId}`,
      label: "2",
      style: 1,
      disabled: filledSlots.includes("1"),
    },
    {
      custom_id: `ttt_2_${uniqueId}`,
      label: "3",
      style: 1,
      disabled: filledSlots.includes("2"),
    },
  ]),
  createButtons([
    {
      custom_id: `ttt_3_${uniqueId}`,
      label: "4",
      style: 1,
      disabled: filledSlots.includes("3"),
    },
    {
      custom_id: `ttt_4_${uniqueId}`,
      label: "5",
      style: 1,
      disabled: filledSlots.includes("4"),
    },
    {
      custom_id: `ttt_5_${uniqueId}`,
      label: "6",
      style: 1,
      disabled: filledSlots.includes("5"),
    },
  ]),
  createButtons([
    {
      custom_id: `ttt_6_${uniqueId}`,
      label: "7",
      style: 1,
      disabled: filledSlots.includes("6"),
    },
    {
      custom_id: `ttt_7_${uniqueId}`,
      label: "8",
      style: 1,
      disabled: filledSlots.includes("7"),
    },
    {
      custom_id: `ttt_8_${uniqueId}`,
      label: "9",
      style: 1,
      disabled: filledSlots.includes("8"),
    },
  ]),
];

const getTicTacToeGame = (client, uniqueId) => {
  const tttGames = client.games.get("tictactoe") || {};
  return tttGames[uniqueId];
};

const deleteRpsGame = (client, uniqueId) => {
  const tttGames = client.games.get("tictactoe") || {};

  delete tttGames[uniqueId];

  client.games.set("tictactoe", tttGames);
};

const getBoard = (opponentChoices, challengerChoices) => {
  let board = Array(9).fill("⬜");

  challengerChoices.forEach((pos) => (board[pos] = "❌"));
  opponentChoices.forEach((pos) => (board[pos] = "⭕"));

  return `${board.slice(0, 3).join(" ")}\n${board
    .slice(3, 6)
    .join(" ")}\n${board.slice(6, 9).join(" ")}`;
};

const checkForWinner = (
  opponentChoices,
  challengerChoices,
  opponentId,
  challengerId
) => {
  const winningCombinations = [
    ["0", "1", "2"],
    ["3", "4", "5"],
    ["6", "7", "8"],
    ["0", "3", "6"],
    ["1", "4", "7"],
    ["2", "5", "8"],
    ["0", "4", "8"],
    ["2", "4", "6"],
  ];

  const hasWinningCombo = (choices) => {
    return winningCombinations.some((combination) =>
      combination.every((pos) => choices.includes(pos))
    );
  };

  if (hasWinningCombo(challengerChoices)) {
    return `That was a close game but <@${challengerId}> took the win!`; // x
  }
  if (hasWinningCombo(opponentChoices)) {
    return `That was a close game but <@${opponentId}> took the win!`; // o
  }
  if (challengerChoices.length + opponentChoices.length === 9) {
    return "Guess you're both pretty bad at this game... Better luck next time!"; // d
  }

  return false;
};

module.exports = {
  name: "ttt",

  async execute(client, interaction) {
    try {
      const reply = (content) => {
        return interaction.update(content);
      };

      const [_, type, action] = interaction.customId.split("_");

      const gameInfo = getTicTacToeGame(client, action);

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
            "You can't participate in this game, you can start a new game using `/tictactoe`.",
          flags: client.interaction_flags,
        });
      }

      if (gameInfo.currentUser !== interaction.user.id) {
        return interaction.reply({
          content:
            "It's not your turn, wait for opponent before you play another game.",
          flags: client.interaction_flags,
        });
      }

      if (gameInfo.challenger?.userId === interaction.user.id) {
        gameInfo.challenger.positions.push(type);
      } else if (gameInfo.opponent?.userId === interaction.user.id) {
        gameInfo.opponent.positions.push(type);
      }

      const results = checkForWinner(
        gameInfo.opponent.positions,
        gameInfo.challenger.positions,
        gameInfo.opponent.userId,
        gameInfo.challenger.userId
      );

      if (!results) {
        if (gameInfo.currentUser === gameInfo.opponent.userId) {
          gameInfo.currentUser = gameInfo.challenger.userId;
        } else {
          gameInfo.currentUser = gameInfo.opponent.userId;
        }

        return reply({
          embeds: [
            basicEmbed({
              author: { name: "TicTacToe" },
              description:
                `The ultimate game of TicTacToe between <@${gameInfo.challenger.userId}> and <@${gameInfo.opponent.userId}>.\n\nWaiting for <@${gameInfo.currentUser}> to choose\n\n` +
                getBoard(
                  gameInfo.opponent.positions,
                  gameInfo.challenger.positions
                ),
              color: 16231462,
            }),
          ],
          components: getButtons(
            [...gameInfo.opponent.positions, ...gameInfo.challenger.positions],
            action
          ),
        });
      }

      deleteRpsGame(client, action);

      return reply({
        embeds: [
          basicEmbed({
            author: { name: "TicTacToe" },
            description:
              `${results}\n\n` +
              getBoard(
                gameInfo.opponent.positions,
                gameInfo.challenger.positions
              ),
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
