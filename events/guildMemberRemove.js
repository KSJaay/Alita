const replacers = require("../utils/replacers");
const logger = require("../logger");
const {fetchOrCreateGuild} = require("../database/queries/guild");

module.exports = async (client, member) => {
  try {
    let guild = member.guild;
    let guild_data = await fetchOrCreateGuild(guild.id); // Get guild document from database
    if (!guild_data.goodbye.enabled) return; // Goodbye messages aren't enabled

    let goodbyeChannel = await member.guild.channels.cache.get(
      guild_data.goodbye.channel,
      guild
    ); // Try find the channel
    if (!goodbyeChannel) return; // Unable to find channel in guild

    let goodbyeMsg = !guild_data.goodbye.message
      ? "{user.ping} has left the server!"
      : guild_data.goodbye.message; // Get the custom message or use the preset one

    // Replace all valid tags
    let finalMsg = replacers(goodbyeMsg, member.user, member.guild);

    return goodbyeChannel.send(finalMsg); // Send the final message to the goodbye channel
  } catch (error) {
    logger.error("guildMemberRemove", {
      label: "Event",
      message: error.message,
      stack: error.stack,
    });
  }
};
