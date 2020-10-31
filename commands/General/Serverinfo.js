const Discord = require("discord.js"),
moment = require('moment');

module.exports = {
    //Command Information
    name: "serverinfo",
    description: "Get information about the server",
    usage: "serverinfo",
    enabled: true,
    aliases: [],
    category: "General",
    memberPermissions: [],
    botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
    nsfw: false,
    cooldown: 3000,
    ownerOnly: false,

    async execute(client, message, args, data) {

      // Use moment to convert ms to date
      let createDate = await moment(message.guild.createdAt).format('MMMM Do YYYY, HH:mm:ss');

      // Get the amount of text and voice channels
      let textChans = await message.guild.channels.cache.filter(x => x.type === 'text').size;
      let voiceChans = await message.guild.channels.cache.filter(x => x.type === 'voice').size;
      // Get the amount of categories
      let catCount = await message.guild.channels.cache.filter(x => x.type === 'category').size;
      // Get the amount of role
      let roleCount = await message.guild.roles.cache.size;

      // Get server verification level
      let verifyLevel = await message.guild.verificationLevel.toLowerCase();
      verifyLevel = verifyLevel.charAt(0).toUpperCase() + verifyLevel.slice(1)
      // Get the amount of banned users
      let banCount = await message.guild.fetchBans()

      // Create the embed and add the information
      let embed = new Discord.MessageEmbed()
      .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
      .setThumbnail(message.guild.iconURL({ dynamic: true }))
      .addFields(
        { name: `Server ID`, value: `${message.guild.id}`, inline: false },
        { name: `Region`, value: message.guild.region, inline: true },
        { name: `Verification Level`, value: verifyLevel, inline: true },
        { name: `Members`, value: message.guild.memberCount, inline: true },
        { name: `Server Owner`, value: `${message.guild.owner} [${message.guild.owner.id}]`, inline: false },
        { name: `Guild Created`, value: createDate, inline: false },
        { name: `Channels [${textChans + voiceChans + catCount}]`, value: `Category: ${catCount}\n\nText: ${textChans}\nVoice: ${voiceChans}`, inline: true },
        { name: `Roles`, value: `${roleCount}\n\`${data.guild.prefix}roles\` - For more information`, inline: true },
        { name: `Bans`, value: banCount.size, inline: false},
        { name: `Server Boosts`, value: `Level: ${message.guild.premiumTier}\nAmount: ${message.guild.premiumSubscriptionCount || 0}` , inline: false },
    	)
      .setColor(data.config.color)
      .setFooter(data.config.footer)

      return message.channel.send(embed);

    },
};
