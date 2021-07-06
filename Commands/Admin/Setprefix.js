module.exports = {
    name: "setprefix",
    usage: ["Set the prefix for your server```{prefix}setprefix <prefix>```"],
    enabled: true,
    aliases: ["prefix"],
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

            if(!args[0]){
                return client.embed.usage(message, data);
            }
            let prefix = args.join(" ");
            data.guild.prefix = prefix;
            await data.guild.save();
            message.guild.prefix = prefix.toLowerCase();
            return message.channel.send(`Prefix has been updated to \`${prefix}\``);

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