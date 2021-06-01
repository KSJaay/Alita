const somethingRandom = require('some-random-cat').Random,
subreddits = [
    "meme",
    "memes",
    "dankmemes",
    // You can add as many as you wish...
]
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

            let randomSubReddit = subreddits[Math.floor(Math.random() * subreddits.length)] // Generates a random subreddit from the array...
            somethingRandom.getMeme(randomSubReddit).then(res => {
                return client.embed.send(message, {
                    title: res.title,
                    url: `https://www.reddit.com/r/${randomSubReddit}`,
                    image: {
                        url: res.img,
                    },
                    color: 'RANDOM',
                    author: {
                        name: `From ${res.author}`,
                        icon_url: '',
                        url: '',
                    }
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