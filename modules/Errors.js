const Discord = require("discord.js");

// Command ERROR
module.exports.Error = (message) => {
    const cmdEmbed = new Discord.MessageEmbed()
        .setColor("RED")
        .setTitle("Oops!")
        .setDescription("**Looks like there was an error trying to do this oof**");

    message.channel.send(cmdEmbed);
};
