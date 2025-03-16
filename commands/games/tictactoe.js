const { customAlphabet } = require("nanoid");

const createButtons = require("../../tools/buttons");
const { basicEmbed } = require("../../tools/embeds");

const nanoid = customAlphabet("1234567890abcdef", 10);

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

const getUniqueId = (client) => {
  const rpsGames = client.games.get("tictactoe") || {};
  let uniqueId = nanoid();
  while (rpsGames[uniqueId]) {
    uniqueId = nanoid();
  }

  return uniqueId;
};

const addGameData = (client, uniqueId, userId, opponentId, isBot = false) => {
  client.games.set("tictactoe", {
    ...client.games.get("tictactoe"),
    [uniqueId]: {
      challenger: { userId, positions: [] },
      opponent: { userId: opponentId, positions: [] },
      currentUser: userId,
      uniqueId,
      isBot,
    },
  });
};

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

    const uniqueId = getUniqueId(client);

    addGameData(
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
      components: getButtons([], uniqueId),
    });
  },
};
