const randomPuppy = require('random-puppy');

module.exports = {
    name: "dog",
    usage: [""],
    enabled: true,
    aliases: [],
    category: "Images",
    memberPermissions: [],
    botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
    //Settings for command
    nsfw: false,
    ownerOnly: false,
    cooldown: 5000,

    // Execute contains content for the command
    async execute(client, message, args, data){
        try{
            let url = await randomPuppy('dogpictures');
            return client.embed.send(message, {
                title: 'Doggo :heart_eyes:',
                image: {
                    url: url
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