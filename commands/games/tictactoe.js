const { basicEmbed } = require("../../tools/embeds");
const {
  getUniqueTicTacToeId,
  addTicTacToeGameData,
  getTicTacToeButtons,
} = require("../../tools/commands/tictactoe");

module.exports = {
  name: "tictactoe",
  description: "Play a game of tic-tac-toe against another user!",
  usage: "tictactoe <user>",
  category: "games",

  async execute(client, interaction) {
    const opponent = interaction.options.getUser("member");
    let userId = "";
    if (!opponent) {
      userId = "bot";
    } else {
      userId = opponent.id;
    }

    if (userId === interaction.user.id) {
      return interaction.reply({
        content: "You cannot play against yourself!",
        flags: client.interaction_flags,
      });
    }

    const tictactoeGames = client.games.get("tictactoe") || {};

    const existingGame = Object.values(tictactoeGames).find(
      (game = {}) =>
        game.opponent?.userId === interaction.user.id ||
        game.challenger?.userId === interaction.user.id
    );

    if (existingGame) {
      return interaction.reply({
        content: `You already have a game with <@${existingGame.opponent.userId}>. End that game before starting a new one!`,
        flags: client.interaction_flags,
      });
    }

    const uniqueId = getUniqueTicTacToeId(client);

    addTicTacToeGameData(
      client,
      uniqueId,
      interaction.user.id,
      userId,
      userId === "bot"
    );

    return interaction.reply({
      embeds: [
        basicEmbed({
          author: { name: "TicTacToe" },
          description: `The ultimate game of TicTacToe between <@${interaction.user.id}> and <@${userId}>.\n\nWaiting for <@${interaction.user.id}> to choose\n\n⬜ ⬜ ⬜\n⬜ ⬜ ⬜\n⬜ ⬜ ⬜`,
          color: 16231462,
        }),
      ],
      components: getTicTacToeButtons([], uniqueId),
    });
  },
};
