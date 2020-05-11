const Discord = require("discord.js");
const config = require("../../config.json");

module.exports = {
    //Command Information
    name: "botstats",
    description: "Show information about the bot",
    usage: "botstats",
    enabled: true,
    guildOnly: true,
    aliases: ["bot-stats"],
    memberPermissions: [],
    botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    nsfw: false,
    cooldown: 5000,
    ownerOnly: false,

    async execute(client, message, args, data) {

      //Get all the data for the bot
      let uptime = convertMS(message.client.uptime);
      let totalGuilds = client.guilds.cache.size;
      let users = client.users.cache.size;
      let channels = client.channels.cache.size
      let ramUsage = (process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2) + "MB";
      let discord = Discord.version;
      let node = process.versions.node;

      //Create an embed for the information
      let announcementEmbed = new Discord.MessageEmbed()
      .setAuthor(`${client.user.username} stats`, client.user.displayAvatarURL())
      .setThumbnail(client.user.displayAvatarURL())
      .setFooter(config.footer)
      .setColor(config.color);

      //Add the uptime for the embed
      if(uptime.day > 0){
        announcementEmbed.addFields({name: "Uptime", value: `${uptime.day} days ${uptime.hour} hours ${uptime.minute} minutes ${uptime.seconds} seconds`})
      }else if(uptime.hour > 0){
        announcementEmbed.addFields({ name: "Uptime", value: `${uptime.hour} hours ${uptime.minute} minutes ${uptime.seconds} seconds`})
      }else if(uptime.minute > 0){
        announcementEmbed.addFields({ name: "Uptime", value: `${uptime.minute} minutes ${uptime.seconds} seconds`})
      }else if(uptime.seconds > 0){
        announcementEmbed.addFields({ name: "Uptime", value: `${uptime.seconds} seconds`})
      }else{
        announcementEmbed.addFields({ name: "Uptime", value: `IDK :sob:`})
      }

      //Add all the other values for the embed
      announcementEmbed.addFields(
        { name: "Guilds", value: totalGuilds, inline: true},
        { name: "Users", value: users, inline: true },
        { name: "Channels", value: channels, inline: true },
        { name: "RAM usage", value: ramUsage, inline: true },
        { name: "Discord.js", value: discord, inline: true },
        { name: "Node.js", value: node, inline: true },
      )

      //Send the embed
      return message.channel.send(announcementEmbed)

      //Turn milliseconds to time for uptime
      function convertMS( milliseconds ) {
          var day, hour, minute, seconds;
          seconds = Math.floor(milliseconds / 1000);
          minute = Math.floor(seconds / 60);
          seconds = seconds % 60;
          hour = Math.floor(minute / 60);
          minute = minute % 60;
          day = Math.floor(hour / 24);
          hour = hour % 24;
          return {
              day: day,
              hour: hour,
              minute: minute,
              seconds: seconds
          };
      }


    },
};
