const { customAlphabet } = require("nanoid");
const createButtons = require("../buttons");

const nanoid = customAlphabet("1234567890abcdef", 10);

const getTicTacToeButtons = (filledSlots, uniqueId) => [
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

const getUniqueTicTacToeId = (client) => {
  const rpsGames = client.games.get("tictactoe") || {};
  let uniqueId = nanoid();
  while (rpsGames[uniqueId]) {
    uniqueId = nanoid();
  }

  return uniqueId;
};

const addTicTacToeGameData = (
  client,
  uniqueId,
  userId,
  opponentId,
  isBot = false
) => {
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
  getTicTacToeButtons,
  getUniqueTicTacToeId,
  addTicTacToeGameData,
};
