module.exports = {
    name: "botstats",
    usage: ["Information about the current statitics of the bot```{prefix}botstats```"],
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
            let uptime = await client.tools.convertTime(message.client.uptime);
            let ram = ((process.memoryUsage().heapUsed / 1024 / 1024) + (process.memoryUsage().heapTotal / 1024 / 1024)).toFixed(2);
                return client.embed.send(message, {
                    color: 'RANDOM',
                    author: {
                        name: client.user.username,
                        icon_url: client.user.displayAvatarURL()
                    },
                    fields: [
                        {
                            name: 'Developers',
                            value: '```KSJaay#2487```',
                        },
                        {
                            name: 'Channels',
                            value: `\`\`\`${client.channels.cache.size}\`\`\``,
                            inline: true,
                        },
                        {
                            name: 'Users',
                            value: `\`\`\`${client.users.cache.size}\`\`\``,
                            inline: true,
                        },
                        {
                            name: 'Guilds',
                            value: `\`\`\`${client.guilds.cache.size}\`\`\``,
                            inline: true,
                        },
                        {
                            name: 'RAM usage',
                            value: `\`\`\`${ram}MB\`\`\``,
                            inline: true,
                        },
                        {
                            name: 'API latency',
                            value: `\`\`\`${client.ws.ping} ms\`\`\``,
                            inline: true,
                        },
                        {
                            name: 'Uptime',
                            value: `\`\`\`${uptime}\`\`\``,
                        },
                    ],
                    footer: {
                        icon_url: client.user.displayAvatarURL(),
                    },
                })

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