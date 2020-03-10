const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Botstats extends Command {

    async run (message, args, db) {

      let uptime = convertMS(message.client.uptime);
      let totalGuilds = this.client.guilds.cache.size;
      let users = this.client.users.cache.size;
      let channels = this.client.channels.cache.size
      let ramUsage = (process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2) + "MB";
      let discord = Discord.version;
      let node = process.versions.node;


      let announcementEmbed = new Discord.MessageEmbed()
      .setAuthor(`${this.client.user.username} stats`, this.client.user.displayAvatarURL())
      .setThumbnail(this.client.user.displayAvatarURL())
      .setFooter(db.config.embed.footer)
      .setColor(db.config.embed.color);

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

      announcementEmbed.addFields(
        { name: "Guilds", value: totalGuilds, inline: true},
        { name: "Users", value: users, inline: true },
        { name: "Channels", value: channels, inline: true },
        { name: "RAM usage", value: ramUsage, inline: true },
        { name: "Discord.js", value: discord, inline: true },
        { name: "Node.js", value: node, inline: true },
      )
      return message.channel.send(announcementEmbed)


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


    }

    constructor (client) {
        super(client, {
            name: "botstats",
            description: "Show information about the bot.",
            usage: "botstats",
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            nsfw: false,
            aliases: ["bot-stats"],
            memberPermissions: [],
            botPerms: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            ownerOnly: false,
            cooldown: 1000
        });
    }
}

module.exports = Botstats;
