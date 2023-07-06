const replacers = require("../utils/replacers");
const logger = require("../logger");
const {fetchOrCreateGuild} = require("../database/queries/guild");

module.exports = async (client, member) => {
  try {
    let guild = member.guild;
    let guild_data = await fetchOrCreateGuild(guild.id); // Get guild document from database
    if (!guild_data.welcome.enabled) return; // Welcome messages aren't enabled

    let welcomeChannel = await member.guild.channels.cache.get(
      guild_data.welcome.channel,
      guild
    ); // Try find the welcome channel

    if (!welcomeChannel) return; // Unable to find channel in guild

    let welcomeMsg =
      guild_data.welcome.message === null ||
      guild_data.welcome.message === "" ||
      guild_data.welcome.message === " "
        ? "Welcome {user.ping} to {guild.name}!"
        : guild_data.welcome.message; // Get the custom message or use the preset one

    // Replace all valid tags
    let finalMsg = replacers(welcomeMsg, member.user, member.guild);

    return welcomeChannel.send(finalMsg); // Send the final message to the welcome channel
  } catch (error) {
    logger.error("guildMemberAdd", {
      label: "Event",
      message: error.message,
      stack: error.stack,
    });
  }
};
