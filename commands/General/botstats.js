const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Botstats extends Command {
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
        announcementEmbed.addField("Uptime", `${uptime.day} days ${uptime.hour} hours ${uptime.minute} minutes ${uptime.seconds} seconds`)
      }else if(uptime.hour > 0){
        announcementEmbed.addField("Uptime", `${uptime.hour} hours ${uptime.minute} minutes ${uptime.seconds} seconds`)
      }else if(uptime.minute > 0){
        announcementEmbed.addField("Uptime", `${uptime.minute} minutes ${uptime.seconds} seconds`)
      }else if(uptime.seconds > 0){
        announcementEmbed.addField("Uptime", `${uptime.seconds} seconds`)
      }else{
        announcementEmbed.addField("Uptime", `IDK :sob:`)
      }

      announcementEmbed.addField("Guilds", totalGuilds, true)
      .addField("Users", users, true)
      .addField("Channels", channels, true)
      .addField("RAM usage", ramUsage, true)
      .addField("Discord.js", discord, true)
      .addField("Node.js", node, true)
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
}

module.exports = Botstats;
