module.exports = {
    name: "goodbye",
    usage: ["When user leaves server send message to channel.", "Set channel for the goodbye message```{prefix}goodbye set #channel```", "Set up a custom goodbye message```{prefix}goodbye custom <text>```", "Disable the goodbye message```{prefix}goodbye disable```","Disable the goodbye message```{prefix}goodbye disable```", "Test the goodbye message```{prefix}goodbye test```", "Available variables: ```{user.ping} - @KSJaay#2487\n{user.name} - KSJaay\n{user.id} - 249955383001481216\n{user.tag} - KSJaay#2487\n{guild.name} - AlitaBot\n{guild.id} - 597797831478214696\n{guild.totalUser} - 123```"],
    enabled: true,
    aliases: ["leave"],
    category: "Admin",
    memberPermissions: [ "ADMINISTRATOR" ],
    botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
    //Settings for command
    nsfw: false,
    ownerOnly: false,
    cooldown: 5000,

    // Execute contains content for the command
    async execute(client, message, args, data){
        try{

            // If no arguments then return usage error
            if(!args[0]){
                return client.embed.usage(message, data);
            };

            // If addon for goodbye is missing create it
            if(!data.guild.addons.goodbye){
                data.guild.addons.goodbye = { enabled: false, channel:  "", message: "", image: false, embed: false }
                data.guild.markModified('addons.goodbye');
                await data.guild.save();
            };

            // Disable goodbye messages
            if(args[0].toLowerCase() === "disable"){
                // Disable the goodbye messages
                data.guild.addons.goodbye.enabled = false;
                data.guild.markModified('addons.goodbye');
                await data.guild.save();
                return client.embed.send(message, {
                    color: client.config.color,
                    title: 'Goodbye disabled',
                    description: `Goodbye messages have been disabled.`
                });
            };

            if(args[0].toLowerCase() === "test"){
                // If goodbye messages are disabled or channel isn't set return error
                if(!data.guild.addons.goodbye.enabled || data.guild.addons.goodbye.channel.trim() === ""){
                    return message.channel.send('Goodbye messages are currently disabled.')
                }
                
                // Find the channel
                let channel = await client.tools.resolveChannel(data.guild.addons.goodbye.channel, message.guild);
                let goodbyeMsg = (data.guild.addons.goodbye.message === null || data.guild.addons.goodbye.message === "" || data.guild.addons.goodbye.message === " ") ? "{user.ping} has left the server!" : data.guild.addons.goodbye.message; // Get the custom message or use the preset one
                
                // Replace all valid tags
                let fmsg = await goodbyeMsg
                .replace("{user.ping}", `${message.author}`)
                .replace("{user.name}", `${message.author.username}`)
                .replace("{user.id}", `${message.author.id}`)
                .replace("{user.tag}", `${message.author.tag}`)
                .replace("{guild.name}", `${message.guild.name}`)
                .replace("{guild.id}", `${message.guild.id}`)
                .replace("{guild.totalUser}", `${message.guild.memberCount}`);
                
                return channel.send(fmsg);
            };

            // Return usage error as users missing arguments
            if(!args[1]){
                return client.embed.usage(message, data);
            };

            // Set up goodbye messages
            if(args[0].toLowerCase() === "set"){
                // Find the mentioned channel
                let channel = await client.tools.resolveChannel(args[1], message.guild);
                if(!channel) return message.channel.send("Unable to find the mentioned channel");

                // Enable goodbye message and save channel
                data.guild.addons.goodbye.enabled = true;
                data.guild.addons.goodbye.channel = channel.id;
                data.guild.markModified('addons.goodbye');
                await data.guild.save();

                // Return success message to user
                return client.embed.send(message, {
                    color: client.config.color,
                    title: 'Channel set',
                    description: `Goodbye messages will be sent to ${channel}`
                });
            };

            // Set up custom message for goodbye messages
            if(args[0].toLowerCase() === "custom"){
                // Join arguments into a string
                let msg = args.slice(1).join(" ");
                // Save the message to the database
                data.guild.addons.goodbye.message = msg;
                data.guild.markModified('addons.goodbye');
                await data.guild.save();

                // Return success message to user
                return client.embed.send(message, {
                    color: client.config.color,
                    title: 'Message set',
                    description: `Goodbye message has been set to: \`${msg}\``
                });
            };

            // None of the requirements were met so return usage error
            return client.embed.usage(message, data);

        }catch(err){
            client.logger.error(`Ran into an error while executing ${data.cmd.name}`)
            console.log(err)
            return client.embed.send(message, {
                description: `An issue has occured while running the command. If this error keeps occuring please contact our development team.`,
                color: `RED`,
                author: {
                    name: `Uh Oh!`,
                    icon_url: `${message.author.displayAvatarURL()}`,
                    url: "",
                }
            });
        }
    }
}