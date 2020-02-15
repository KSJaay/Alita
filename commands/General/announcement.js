const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Announcement extends Command {
    constructor (client) {
        super(client, {
            name: "announcement",
            description: "Create an embed for an announcement",
            usage: "announcement {Text}",
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            nsfw: false,
            aliases: ["announce"],
            memberPermissions: ["ADMINISTRATOR"],
            botPerms: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            ownerOnly: false,
            cooldown: 1000
        });
    }

    async run (message, args, db) {
      const embedMessage = args.join(" ");

      if(!embedMessage){
        return message.channel.send("Please enter the message you want in the embed")
      }

      if(embedMessage.length > 1035){
        return message.channel.send("Please make sure your text is shorter than 1035 Characters. Currently it is: " + embedMessage.length + " characters.")
      }

      let announcementEmbed = new Discord.MessageEmbed()
      .setTitle("Announcement")
      .setDescription(embedMessage)
      .setFooter(`Created by ${message.author.username}`)
      .setColor(db.config.embed.color)
      return message.channel.send(announcementEmbed)
    }
}

module.exports = Announcement;
