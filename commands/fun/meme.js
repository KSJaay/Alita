const axios = require("axios");
const {successEmbed} = require("../../utils/embeds");

module.exports = {
  name: "meme",
  category: "⚙️ Fun",
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
      axios.get("https://some-random-api.ml/meme").then((res) => {
        return interaction.reply({
          embeds: [
            successEmbed({
              title: res.data.caption,
              url: res.data.image,
              image: {
                url: res.data.image,
              },
              color: 7143340,
            }),
          ],
        });
      });
    } catch (error) {
      logger.error(`Error executing '${this.name}' command!`, {
        label: "Command",
        message: error.message,
        stack: error.stack,
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
