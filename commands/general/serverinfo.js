const {successEmbed} = require("../../utils/embeds");
const logger = require("../../logger");

module.exports = {
  name: "serverinfo",
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
      console.log(interaction.guild);

      const guildCreateDate = interaction.guild.createdAt;
      const textChannels = interaction.guild.channels.cache.filter(
        (channel) => channel.type === "GUILD_TEXT"
      );
      const voiceChannels = interaction.guild.channels.cache.filter(
        (channel) => channel.type === "GUILD_VOICE"
      );
      const categoryChannels = interaction.guild.channels.cache.filter(
        (channel) => channel.type === "GUILD_CATEGORY"
      );
      const roleCount = interaction.guild.roles.cache.filter(
        (role) => role.name !== "@everyone"
      ).size;
      const emojiCount = interaction.guild.emojis.cache.size;
      const boostCount = interaction.guild.premiumSubscriptionCount;
      const boostTier = interaction.guild.premiumTier;
      const verificationLevel = interaction.guild.verificationLevel;
      const explicitContentFilter = interaction.guild.explicitContentFilter;
      const guildFeatures = interaction.guild.features.join(", ") || "None";
      const guildOwner = interaction.guild.ownerId;

      return interaction.reply({
        embeds: [
          successEmbed({
            title: "Server Info",
            description: `**${interaction.guild.name}**`,
            fields: [
              {
                name: "General",
                value: `**Created At:** ${guildCreateDate}\n**Text Channels:** ${textChannels.size}\n**Voice Channels:** ${voiceChannels.size}\n**Categories:** ${categoryChannels.size}\n**Roles:** ${roleCount}\n**Emojis:** ${emojiCount}\n**Boosts:** ${boostCount}\n**Boost Tier:** ${boostTier}\n**Verification Level:** ${verificationLevel}\n**Explicit Content Filter:** ${explicitContentFilter}\n**Features:** ${guildFeatures}`,
              },
              {
                name: "Owner",
                value: `**ID:** ${guildOwner}\n**User**: <@!${guildOwner}>`,
              },
            ],
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
    name: "serverinfo",
    description: "Information about the current server",
    options: [],
  },
};
