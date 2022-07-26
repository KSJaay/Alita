const axios = require('axios');

module.exports = {
    name: "meme",
    usage: ["Get meme from a random subreddit```{prefix}meme```"],
    enabled: true,
    aliases: ["memes"],
    category: "Fun",
    memberPermissions: [],
    botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
    //Settings for command
    nsfw: false,
    ownerOnly: false,
    cooldown: 5000,

    // Execute contains content for the command
    async execute(client, message, args, data){
        try{
            axios.get('https://some-random-api.ml/meme').then(res => {
                return client.embed.send(message, {
                    title: res.data.caption,
                    url: res.data.image,
                    image: {
                        url: res.data.image,
                    },
                    color: 'RANDOM',
                })
            }).catch(err => console.log(err));

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