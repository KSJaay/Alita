const Discord = require("discord.js");
const mongoose = require("mongoose");

module.exports = {
    //Command Information
    name: "botstats",
    description: "Get the current stats of the bot",
    usage: "botstats",
    enabled: true,
    aliases: ["stats"],
    category: "General",
    memberPermissions: [],
    botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
    nsfw: false,
    cooldown: 3000,
    ownerOnly: false,

    async execute(client, message, args, data) {

      //Get uptime and ram usage for bot
      let uptime = convertMs(message.client.uptime);
      let ramUsage = (process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2) + "MB";

      //Create an embed for the information
      let statsEmbed = new Discord.MessageEmbed()
      .setAuthor(`${client.user.username} stats`, client.user.displayAvatarURL())
      .setThumbnail(client.user.displayAvatarURL())
      .setFooter(data.config.footer)
      .setColor(data.config.color);

      //Add all the other values for the embed
      statsEmbed.addFields(
        { name: "Channels", value:  "```" + client.channels.cache.size + "```", inline: true },
        { name: "Guilds", value: "```" + client.guilds.cache.size + "```", inline: true},
        { name: "Users", value:  "```" + client.users.cache.size + "```", inline: true },
        { name: "RAM usage", value:  "```" + ramUsage + "```", inline: true },
        { name: "API Latency", value:  "```" + client.ws.ping + "```", inline: true },
        { name: "Built using", value:  "```" + `Node.js: V${process.versions.node}, Discord.js: V${Discord.version}, Mongoose: V${mongoose.version}` + "```", inline: false },
        { name: "Uptime", value:  "```" + uptime + "```", inline: false },
      )

      //Send the embed
      return message.channel.send(statsEmbed)

      //Convert ms into time
      function convertMs(mills){
        let roundNumber = mills > 0 ? Math.floor : Math.ceil;
        let days = roundNumber(mills / 86400000),
        hours = roundNumber(mills / 3600000) % 24,
        mins = roundNumber(mills / 60000) % 60,
        secs = roundNumber(mills / 1000) % 60;
        var time = (days > 0) ? `${days} Days, ` : "";
        time += (hours > 0) ? `${hours} Hours, ` : "";
        time += (mins > 0) ? `${mins} Minutes, ` : "";
        time += (secs > 0) ? `${secs} Seconds` : "0 Seconds";
        return time;
      }

    },
};
