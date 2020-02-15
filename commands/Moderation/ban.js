const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Ban extends Command {
    constructor (client) {
        super(client, {
            name: "ban",
            description: "ban a member from your server",
            usage: "ban @user",
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            nsfw: false,
            aliases: [],
            memberPermissions: [ "BAN_MEMBERS", "MANAGE_CHANNELS" ],
            botPerms: [ "SEND_MESSAGES", "EMBED_LINKS", "BAN_MEMBERS" ],
            ownerOnly: false,
            cooldown: 1000
        });
    }

    async run (message, args, db) {

      let user = await this.client.resolveUser(args[0]);

      if(!user){
          return message.channel.send("Sorry can't find this member currently, maybe they moved houses.");
      }

      if(user.id === message.author.id){
          return message.channel.send("You really tryna ban yourself??");
      }

      let member = await message.guild.members.fetch(user.id).catch(() => {});
      if(member && !member.bannable){
          return message.channel.send("You don't have permissions to ban this member");
      }

     message.guild.members.ban(user)

     message.channel.send(`${user.tag} has been banned from the server!`)


    }
}

module.exports = Ban;
