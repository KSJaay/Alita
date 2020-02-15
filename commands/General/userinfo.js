const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Userinfo extends Command {
    constructor (client) {
        super(client, {
            name: "userinfo",
            description: "Find information about your profile or a user in your server",
            usage: "userinfo",
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
      .setAuthor(message.author.username)
      .setFooter(db.config.embed.footer)
      .setColor(db.config.embed.color)
      return message.channel.send(announcementEmbed)
    }
}

module.exports = Userinfo;
