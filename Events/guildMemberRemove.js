module.exports = async(client, member) => {
    try {
        let guild = member.guild;
        let guildData = await client.Database.fetchGuild(guild.id); // Get guild document from database
        if(!guildData.addons.goodbye.enabled) return; // Goodbye messages aren't enabled
    
        let goodbyeChannel = await client.tools.resolveChannel(guildData.addons.goodbye.channel, guild); // Try find the channel
        if(!goodbyeChannel) return; // Unable to find channel in guild
    
        let goodbyeMsg = (guildData.addons.goodbye.message === null || guildData.addons.goodbye.message === "" || guildData.addons.goodbye.message === " ") ? "{user.ping} has left the server!" : guildData.addons.goodbye.message; // Get the custom message or use the preset one

        // Replace all valid tags
        let finalMsg = await goodbyeMsg
        .replace(/{user.ping}/g, `${member.user}`)
        .replace(/{user.name}/g, `${member.user.username}`)
        .replace(/{user.id}/g, `${member.user.id}`)
        .replace(/{user.tag}/g, `${member.user.tag}`)
        .replace(/{guild.name}/g, `${guild.name}`)
        .replace(/{guild.id}/g, `${guild.id}`)
        .replace(/{guild.totalUser}/g, `${guild.memberCount}`);
    
        return goodbyeChannel.send(finalMsg) // Send the final message to the goodbye channel
    
    } catch (e) {
        console.log(e);
    }
    
    };