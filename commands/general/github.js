const axios = require("axios");
const {successEmbed} = require("../../utils/embeds");
const logger = require("../../logger");

module.exports = {
  name: "github",
  category: "📋 General",
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
      const user = interaction.options.getString("user");
      const repo = interaction.options.getString("repo");

      const path =
        user && repo ? `repos/${user}/${repo}` : "repos/ksjaay/alita";
      const url = `https://api.github.com/${path}`;

      const query = await axios.get(url);

      if (query.status !== 200) {
        return interaction.reply({
          content: "Error fetching data",
          ephemeral: false,
        });
      }

      const repoData = query.data;

      interaction.reply({
        embeds: [
          successEmbed({
            author: {
              name: repoData.owner.login,
              icon_url: repoData.owner.avatar_url,
              url: "",
            },
            description: `${repoData.description}\n[Repository Link](${repoData.html_url})`,
            fields: [
              {
                name: "Repo Name :notepad_spiral:",
                value: repoData.name,
                inline: true,
              },
              {
                name: "Stars :star:",
                value: repoData.stargazers_count,
                inline: true,
              },
              {
                name: "Forks :gear:",
                value: repoData.forks,
                inline: true,
              },
              {
                name: "Language :desktop:",
                value: repoData.language,
                inline: true,
              },
            ],
            image: {
              url: repoData.owner.avatar_url,
            },
          }),
        ],
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
    name: "github",
    description: "Get information about a github repository",
    options: [
      {
        type: 3,
        name: "user",
        description: "Name of Github user",
        required: true,
      },
      {
        type: 3,
        name: "repo",
        description: "Name of Github repository",
        required: true,
      },
    ],
  },
};
