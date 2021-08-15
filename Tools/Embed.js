const Discord = require("discord.js"),
config = require('./../config.json');

module.exports.send = async function(message, embed){
    let newEmbed = new Discord.MessageEmbed()
    .setFooter(config.footer)
    .setColor(config.color)
    embed = {... newEmbed, ... embed}

    return message.channel.send({embeds: [embed]});

};

module.exports.usage = async function(message, data){
    let cmd = data.cmd;
    let usageDesc = await cmd.usage.join("\n").replace(/{prefix}/g, data.guild.prefix);

    let newEmbed = new Discord.MessageEmbed()
    .setFooter(config.footer)
    .setColor("RED")
    .setAuthor("Uh Oh!", message.author.displayAvatarURL())
    .setDescription("Missing arguments for command. Please provide the valid inputs.")
    .addField("__Usage__", usageDesc);

    return message.channel.send({embeds: [newEmbed]});

};