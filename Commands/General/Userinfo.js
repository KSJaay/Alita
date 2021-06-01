const moment = require('moment');

module.exports = {
    name: "userinfo",
    usage: ["Get information about your profile```{prefix}userinfo```"],
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
            // Get member from guild
            let member = !args[0] ? await client.tools.resolveMember(message.author.id, message.guild) : await client.tools.resolveMember(args[0], message.guild)

            // Get a list of roles
            let roleCount = await member.roles.cache.map(x => "<@&" + x.id + ">").join(" ");
            // Get joined date for member
            let joinDate = await moment(member.joinedTimestamp).format('MMMM Do YYYY, HH:mm:ss');
            // Get user account create date
            let createDate = await moment(member.createdAt).format('MMMM Do YYYY, HH:mm:ss');

            // Add the information to the embed
            return client.embed.send(message, {
                author: {
                    name: member.user.username,
                    icon_url: member.user.displayAvatarURL({ dynamic: true }),
                    url: '',
                },
                thumbnail: {
                    url: member.user.displayAvatarURL({ dynamic: true }),
                },
                fields: [
                    { name: `User`, value: `${member.user} [${member.user.id}]`, inline: false },
                    { name: `Created At`, value: createDate, inline: false },
                    { name: `Joined At`, value: joinDate, inline: false },
                    { name: `Roles`, value: roleCount, inline: false }
                ]
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