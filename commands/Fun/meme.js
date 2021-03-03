const { MessageEmbed } = require('discord.js');
const somethingRandom = require('some-random-cat').Random 

const subreddits = [
    "meme",
    "memes",
    "dankmemes",
    // You can add as many as you wish...
]

module.exports = {
    //Command Information
    name: "meme",
    description: "Gets a dank meme from reddit",
    usage: "<prefix >meme",
    enabled: true,
    aliases: [],
    category: "Fun",
    memberPermissions: [],
    botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
    nsfw: false,
    cooldown: 3000,
    ownerOnly: false,

    async execute(client, message, args, data) {
    let randomSubReddit = subreddits[Math.floor(Math.random() * subreddits.length)] // Generates a random subreddit from the array...
    somethingRandom.getMeme(randomSubReddit).then(res => {
        const embed = new MessageEmbed()
        .setTitle(res.title)
        .setURL(`https://www.reddit.com/r/${randomSubReddit}`)
        .setImage(res.img)
        .setFooter(data.config.footer)
        .setAuthor(`From ${res.author}`)
        .setColor('RANDOM')
        message.channel.send(embed);
    }).catch(e => message.channel.send('API Error.'))
}}