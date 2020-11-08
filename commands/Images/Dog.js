const Discord = require("discord.js");
const randomPuppy = require('random-puppy');

module.exports = {
    //Command Information
    name: "dog",
    description: "Get an image of a doggo :)",
    usage: "dog",
    enabled: true,
    aliases: [],
    category: "Images",
    memberPermissions: [],
    botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
    nsfw: false,
    cooldown: 3000,
    ownerOnly: false,

    async execute(client, message, args, data) {

        // Check for mentioned users
        // If no member is mentioned then use message author else find member from guild
        let user = !args[0] ? message.author : await findMember(args[0], message.guild)

        let url = await randomPuppy();

        // Create embed and send user the avatar with links
        let embed = new Discord.MessageEmbed()
        .setTitle(`Doggo :heart_eyes:`)
        .setImage(url)
        .setColor(data.config.color)
        .setFooter(data.config.footer)
        return message.channel.send(embed)




    },
};
