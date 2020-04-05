const Discord = require("discord.js");

// Command ERROR
module.exports.Error = (message) => {
    const cmdEmbed = new Discord.MessageEmbed()
        .setColor("RED")
        .setTitle("Oops!")
        .setDescription("**Looks like there was an error trying to do this oof**");

    message.author.send(cmdEmbed);
};

// Command NSFW
module.exports.NSFW = (message) => {
    const cmdEmbed = new Discord.MessageEmbed()
        .setColor("RED")
        .setTitle("Oops!")
        .setDescription("**Looks like there was an error trying to do this oof**");

    message.author.send(cmdEmbed);
};

// Command Cooldown
module.exports.Cooldown = (cooldown, message) => {
    const cmdEmbed = new Discord.MessageEmbed()
        .setColor("RED")
        .setTitle("Oops!")
        .setDescription("**Looks like there was an error trying to do this oof**");

    message.author.send(cmdEmbed);
};
