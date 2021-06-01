module.exports = {
    name: "calculator",
    usage: ["Do basic calculations```{prefix}calculator <operation>```", "Examples:```5 * 8\n3 / 3\n8 ~ 2```"],
    enabled: true,
    aliases: ["cal"],
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
            let signos = ["*","/","+","-","x"];
            if(!args[2]){
                return client.embed.usage(message, data);
            };

            if(!signos.includes(args[1].toLowerCase())){
                return client.embed.usage(message, data);
            };

            let signo = args[1].toLowerCase() === "x" ? '*' : args[1];
            let calculation = await eval(args[0]+signo+args[2]);
            return client.embed.send(message, {
                title: 'Calculator!',
                fields: [
                    {
                        name: 'Input',
                        value: `\`\`\`${args[0]} ${signo} ${args[2]}\`\`\``,
                    },
                    {
                        name: 'Output',
                        value: `\`\`\`${calculation}\`\`\``,
                        inline: true,
                    },
                ],
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