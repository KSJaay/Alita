const {successEmbed} = require("../../utils/embeds");
const logger = require("../../logger");
const Reddit = require("../../utils/reddit");
const redditClient = new Reddit("dankmemes");

module.exports = {
  name: "meme",
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
      const image = redditClient.random();

      const embed = successEmbed({
        title: "Dank memes",
        url: image.permalink,
        description: image.title,
        image: {
          url: image.url,
        },
      });

      return interaction.reply({
        embeds: [embed],
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
    name: "meme",
    description: "Generate a random meme",
    options: [],
  },
};
