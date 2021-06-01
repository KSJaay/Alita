module.exports = {
    name: "ping",
    usage: ["Get the current ping of the bot```{prefix}ping```"],
    enabled: true,
    aliases: [],
    category: "General",
    memberPermissions: [],
    botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
    //Settings for command
    nsfw: false,
    ownerOnly: false,
    cooldown: 5000,

    // Execute contains content for the command
    async execute(client, message, args, data){
        try{

            message.channel.send(`Pinging...`).then(async (m) => {
                let latencyPing = Math.floor( m.createdTimestamp - message.createdTimestamp)
                m.edit(`My Latency: \`${latencyPing}ms\`\nAPI Latency: \`${client.ws.ping}ms\``);
            });

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