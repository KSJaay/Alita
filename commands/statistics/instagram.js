const {successEmbed} = require("../../utils/embeds");
const logger = require("../../logger");
const fetchInstagram = require("../../utils/socials/instagram");

module.exports = {
  name: "instagram",
  category: "📷 Statistics",
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
      const user = interaction.options.getString("username");
      const instagram = await fetchInstagram(user);

      if (!instagram) {
        return interaction.reply({
          content: "Unable to find the provided channel.",
        });
      }

      // Get the top liked image
      let topImage;
      if (instagram.imageData.length > 0) {
        topImage = instagram.topImage;
      } else {
        topImage = {
          likes: 0,
          comments: 0,
          image: client.user.displayAvatarURL(),
        };
      }

      return interaction.reply({
        embeds: [
          successEmbed({
            title: instagram.name,
            url: `https://www.instagram.com/${instagram.id}`,
            thumbnail: {
              url: instagram.image,
            },
            description: instagram.bio,
            fields: [
              {
                name: "Followers",
                value: `${instagram.followers.toLocaleString()}`,
                inline: true,
              },
              {
                name: "Following",
                value: `${instagram.following.toLocaleString()}`,
                inline: true,
              },
              {
                name: "Top Images",
                value: instagram.imageData
                  .map((image, index) => {
                    return `**${
                      index + 1
                    }.** ❤️ ${image.likes.toLocaleString()} - [Link](https://www.instagram.com/p/${
                      image.id
                    })`;
                  })
                  .join("\n"),
              },
              {
                name: "MOST LIKED IMAGE",
                value: `❤️ ${topImage.likes.toLocaleString()} 💬 ${topImage.comments.toLocaleString()}`,
              },
            ],
            image: {
              url: topImage.image,
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
    name: "instagram",
    description: "Get information about an instagram account",
    options: [
      {
        type: 3,
        name: "username",
        description: "Name of user's instagram account",
        required: true,
      },
    ],
  },
};
