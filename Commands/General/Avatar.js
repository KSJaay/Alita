module.exports = {
    name: "avatar",
    usage: ["Get a users avatar```{prefix}avatar <@user>```"],
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
            // Find user from guild cache
            let member = !args[0] ? null : await client.tools.resolveMember(args[0], message.guild);
            // Load the user
            let user = (!args[0] || !member) ? message.author : member.user;

            return client.embed.send(message, {
                title: `Avatar to ${user.username}`,
                fields: [
                    {
                        name: 'Links as',
                        value: `[png](${user.displayAvatarURL()}.png?size=1024]) | [jpg](${user.displayAvatarURL()}.jpg?size=1024) | [webp](${user.displayAvatarURL()}.webp?size=1024)`,
                    }
                ],
                image: {
                    url: `${user.displayAvatarURL()}?size=1024`
                }
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