const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Ping extends Command {

    async run (message, args, db) {

      let prefix = args[0];

      if(!prefix){
        return message.channel.send("Current prefix: `" + db.guild.prefix+ "`")
      }

      if(prefix > 6){
        return message.channel.send("Prefix must be 5 Characters or shorter")
      }

      db.guild.prefix = prefix;
      db.guild.save();
      return message.channel.send("Prefix has been updated to: `" + db.guild.prefix + "`")

    }

    constructor (client) {
        super(client, {
            name: "prefix",
            description: "Set the prefix for the server",
            usage: "prefix -a",
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            nsfw: false,
            aliases: ["setprefix"],
            memberPermissions: ["ADMINISTRATOR"],
            botPerms: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            ownerOnly: false,
            cooldown: 1000
        });
    }



}

module.exports = Ping;
