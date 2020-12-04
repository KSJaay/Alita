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

        let url = await randomPuppy();

        let embed = new Discord.MessageEmbed()
        .setTitle(`Doggo :heart_eyes:`)
        .setImage(url)
        .setColor(data.config.color)
        .setFooter(data.config.footer)
        return message.channel.send(embed)




    },
};
