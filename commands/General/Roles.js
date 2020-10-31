const Discord = require("discord.js"),
moment = require('moment');

module.exports = {
    //Command Information
    name: "roles",
    description: "Get a list of all the roles",
    usage: "roles",
    enabled: true,
    aliases: [],
    category: "General",
    memberPermissions: [],
    botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
    nsfw: false,
    cooldown: 3000,
    ownerOnly: false,

    async execute(client, message, args, data) {
      // Get a list of roles
      let roleCount = message.guild.roles.cache.map(x => "<@&" + x.id + ">").join(" ")

      // Return embed with list of roles
      let embed = new Discord.MessageEmbed()
      .setTitle(`Roles [${message.guild.roles.cache.size}]`)
      .setDescription(roleCount)
      .setColor(data.config.color)
      .setFooter(data.config.footer)

      return message.channel.send(embed);

    },
};
