const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Warn extends Command {

    async run (message, args, db) {

      let member = await this.client.resolveMember(args[0], message.guild);
      let dbMember = await this.client.findOrCreateMember({ id: member.id, guildID: message.guild.id });

      if(!member){
          return message.channel.send("Sorry can't find this member currently, maybe they moved houses.");
      }

      if(member.id === message.author.id){
          return message.channel.send("You really tryna warn yourself??");
      }

      if(!dbMember.warnings){
          dbMember.warnings;
          await member.save();
      }

      let reason = args.slice(1).join(" ");

      if(!reason){
        message.channel.send("GIVE ME A REASON FOR THE WARNING!")
      }

      let embed = new Discord.MessageEmbed()
      .setDescription(`<@`+member+`>` + " warned!\n\nReason:\n" + reason)

      let time = Date.now();
      let staff = message.author.id;
      let evi = {
          channel: message.channel.id,
          staffMember: message.author.id,
          date: Date.now(),
          reason,
      };

      dbMember.warnings.push(evi)
      dbMember.save();

      return message.channel.send(embed)


    }

    constructor (client) {
        super(client, {
            name: "warn",
            description: "warn a member from your server",
            usage: "warn @user {reason}",
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            nsfw: false,
            aliases: [],
            memberPermissions: ["KICK_MEMBERS" ],
            botPerms: [ "SEND_MESSAGES", "EMBED_LINKS", "BAN_MEMBERS" ],
            ownerOnly: false,
            cooldown: 1000
        });
    }



}

module.exports = Warn;
