const { customAlphabet } = require("nanoid");
const nanoid = customAlphabet("1234567890abcdef", 10);

const getUniqueRpsId = (client) => {
  const rpsGames = client.games.get("rps") || {};
  let uniqueId = nanoid();
  while (rpsGames[uniqueId]) {
    uniqueId = nanoid();
  }

  return uniqueId;
};

const addRpsGameData = (
  client,
  uniqueId,
  userId,
  opponentId,
  isBot = false
) => {
  client.games.set("rps", {
    ...client.games.get("rps"),
    [uniqueId]: {
      challenger: { userId, weapon: null },
      opponent: { userId: opponentId, weapon: null },
      uniqueId,
      createdAt: Date.now(),
      completedAt: null,
      winner: null,
      isBot,
    },
  });
};

module.exports = {
  getUniqueRpsId,
  addRpsGameData,
};
