module.exports = async(client, member) => {
    try {
        let guild = member.guild;
        let guildData = await client.Database.fetchGuild(guild.id); // Get guild document from database
        if(!guildData.addons.welcome.enabled) return; // Welcome messages aren't enabled
        
        let welcomeChannel = await client.tools.resolveChannel(guildData.addons.welcome.channel, guild); // Try find the welcome channel
        if(!welcomeChannel) return; // Unable to find channel in guild
        
        let welcomeMsg = (guildData.addons.welcome.message === null || guildData.addons.welcome.message === "" || guildData.addons.welcome.message === " ") ? "Welcome {user.ping} to {guild.name}!" : guildData.addons.welcome.message; // Get the custom message or use the preset one

        // Replace all valid tags
        let finalMsg = await welcomeMsg
        .replace(/{user.ping}/g, `${member.user}`)
        .replace(/{user.name}/g, `${member.user.username}`)
        .replace(/{user.id}/g, `${member.user.id}`)
        .replace(/{user.tag}/g, `${member.user.tag}`)
        .replace(/{guild.name}/g, `${guild.name}`)
        .replace(/{guild.id}/g, `${guild.id}`)
        .replace(/{guild.totalUser}/g, `${guild.memberCount}`);
    
        return welcomeChannel.send(finalMsg) // Send the final message to the welcome channel
    
    } catch (e) {
        console.log(e);
    }
    
    };