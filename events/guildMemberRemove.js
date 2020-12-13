module.exports = async(client, member) => {
try {
  let guild = member.guild;
  let guildData = await client.data.getGuildDB(guild.id); // Get guild document from database
  if(!guildData.addons.goodbye.enabled) return; // Goodbye messages aren't enabled

  let goodbyeChannel = await client.tools.resolveChannel(guildData.addons.goodbye.channel, guild); // Try find the channel
  if(!goodbyeChannel) return; // Unable to find channel in guild

  let goodbyeMsg = (guildData.addons.goodbye.message === null || guildData.addons.goodbye.message === "" || guildData.addons.goodbye.message === " ") ? "{user.ping} has left the server!" : guildData.addons.goodbye.message; // Get the custom message or use the preset one

  let finalMsg = await goodbyeMsg
    .replace("{user.ping}", `${member.user}`)
    .replace("{user.name}", `${member.user.username}`)
    .replace("{user.id}", `${member.user.id}`)
    .replace("{user.tag}", `${member.user.tag}`)
    .replace("{guild.name}", `${guild.name}`)
    .replace("{guild.id}", `${guild.id}`)
    .replace("{guild.totalUser}", `${guild.members.cache.size}`); // Replace all valid tags

    return goodbyeChannel.send(finalMsg) // Send the final message to the goodbye channel

} catch (e) {
    console.log(e);
}

};
