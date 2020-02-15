const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Kick extends Command {
    constructor (client) {
        super(client, {
            name: "kick",
            description: "Kick a member from your server",
            usage: "Kick @user",
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            nsfw: false,
            aliases: [],
            memberPermissions: [ "KICK_MEMBERS", "MANAGE_CHANNELS" ],
            botPerms: [ "SEND_MESSAGES", "EMBED_LINKS", "KICK_MEMBERS" ],
            ownerOnly: false,
            cooldown: 1000
        });
    }

    async run (message, args, db) {

      let member = await this.client.resolveMember(args[0], message.guild);

      if(!member){
          return message.channel.send("Sorry can't find this member currently, maybe they moved houses.");
      }

      if(member.id === message.author.id){
          return message.channel.send("You really tryna kick yourself??");
      }

      if(!member.kickable){
          return message.channel.send("You don't have permissions to kick this member");
      }

      member.kick()

      message.channel.send(`${member.user.tag} has been kicked from the server!`)


    }
}

module.exports = Kick;
