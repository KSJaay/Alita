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

      let announcementEmbed = new Discord.MessageEmbed()
      .setAuthor(message.guild.name)
      .setFooter(db.config.embed.footer)
      .setColor(db.config.embed.color)
      return message.channel.send(announcementEmbed)

    }
}

module.exports = Serverinfo;
