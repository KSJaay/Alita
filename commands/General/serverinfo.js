const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Serverinfo extends Command {
    constructor (client) {
        super(client, {
            name: "serverinfo",
            description: "Find out information about your server",
            usage: "serverinfo",
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            nsfw: false,
            aliases: [],
            memberPermissions: [],
            botPerms: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            ownerOnly: false,
            cooldown: 1000
        });
    }

    async run (message, args, db) {

      let serverID = message.guild.id
      let serverOwner = message.guild.owner
      let totalMembers = message.guild.memberCount;
      let totalRoles = message.guild.roles.cache.size;
      let totalChannels = `${message.guild.channels.cache.filter((ch) => ch.type === "text").size} text | ${message.guild.channels.cache.filter((ch) => ch.type === "voice").size} voice`;
      let region = message.guild.region;
      let created = new Date(message.guild.joinedTimestamp);

      let announcementEmbed = new Discord.MessageEmbed()
      .setAuthor(message.guild.name, message.guild.iconURL())
      .setThumbnail(message.guild.iconURL())
      .setFooter(db.config.embed.footer)
      .setColor(db.config.embed.color)
      .addField("Server ID", serverID, true)
      .addField("Server Owner", serverOwner, true)
      .addField("Total members", totalMembers)
      .addField("Total channels", totalChannels)
      .addField("Total roles", totalRoles)
      .addField("Region", region)
      .addField("Created:", `${created.toLocaleDateString()} (${created.toLocaleTimeString()})`)
      return message.channel.send(announcementEmbed)

    }
}

module.exports = Serverinfo;
