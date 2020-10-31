const Discord = require("discord.js"),
moment = require('moment');

module.exports = {
    //Command Information
    name: "userinfo",
    description: "Get information about a user",
    usage: "userinfo",
    enabled: true,
    aliases: [],
    category: "General",
    memberPermissions: [],
    botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
    nsfw: false,
    cooldown: 3000,
    ownerOnly: false,

    async execute(client, message, args, data) {

      // Get member from guild
      let member = !args[0] ? await client.tools.resolveMember(message.author.id, message.guild) : await client.tools.resolveMember(args[0], message.guild)

      // Get a list of roles
      let roleCount = await member.roles.cache.map(x => "<@&" + x.id + ">").join(" ");
      // Get joined date for member
      let joinDate = await moment(member.joinedTimestamp).format('MMMM Do YYYY, HH:mm:ss');
      // Get user account create date
      let createDate = await moment(member.createdAt).format('MMMM Do YYYY, HH:mm:ss');

      // Create the embed and add the information to it
      let embed = new Discord.MessageEmbed()
      .setAuthor(member.user.tag, member.user.displayAvatarURL())
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
      .addFields(
        { name: `User`, value: `${member.user} [${member.user.id}]`, inline: false },
        { name: `Created At`, value: createDate, inline: false },
        { name: `Joined At`, value: joinDate, inline: false },
        { name: `Roles`, value: roleCount, inline: false }
      )
      .setColor(data.config.color)
      .setFooter(data.config.footer)

      return message.channel.send(embed)

    },
};
