const createButtons = require("../../tools/buttons");
const { basicEmbed } = require("../../tools/embeds");
const { getUniqueRpsId, addRpsGameData } = require("../../tools/commands/rps");

module.exports = {
  name: "rps",
  description: "Play a game of rock-paper-scissors!",
  usage: "rps <rock | paper | scissors>",
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

    const rpsGames = client.games.get("rps") || {};

    const existingGame = Object.values(rpsGames).find(
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

    const msg =
      userId === "bot"
        ? `You have chosen to play rock-paper-scissors against **ME**??\n\nChoose your weapon, I'm going to win anyways.`
        : `You have chosen to play rock-paper-scissors against <@${userId}>!\n\nCurrently waiting for:\n<@${interaction.user.id}> to choose an option\n<@${userId}> to choose an option.`;

    const uniqueId = getUniqueRpsId(client);

    addRpsGameData(
      client,
      uniqueId,
      interaction.user.id,
      userId,
      userId === "bot"
    );

    return interaction.reply({
      embeds: [
        basicEmbed({
          author: { name: "Rock-Paper-Scissors" },
          description: msg,
          color: 16231462,
        }),
      ],
      components: [
        createButtons([
          { custom_id: `rps_r_${uniqueId}`, label: "Rock", style: 1 },
          { custom_id: `rps_p_${uniqueId}`, label: "Paper", style: 1 },
          { custom_id: `rps_s_${uniqueId}`, label: "Scissors", style: 1 },
        ]),
      ],
    });
  },
};
