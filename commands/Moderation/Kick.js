const Discord = require("discord.js");
const resolve = require("../../modules/Resolve.js");
module.exports = {
      //Command Information
      name: "kick",
      description: "Kick a member from your server",
      usage: "kick @member",
      enabled: true,
      guildOnly: true,
      aliases: [],
      memberPermissions: ["KICK_MEMBERS",],
      botPermissions: ["KICK_MEMBERS",],
      nsfw: false,
      cooldown: 5000,
      ownerOnly: false,

    async execute(client, message, args) {
      //Get the member
      let member = await resolve.getMember(args[0], message.guild);
      //Check if member exist
      if(!member){
          return message.channel.send("Sorry can't find this member currently, maybe they moved houses.");
      }
      //Check if member id matches author id
      if(member.id === message.author.id){
          return message.channel.send("You really tryna kick yourself??");
      }
      //Check if member can be kicked
      if(!member.kickable){
          return message.channel.send("You don't have permissions to kick this member");
      }

      //Kick the message and return message
      member.kick()
      return message.channel.send(`${member.user.username} has been kicked from the server!`)


    },
};
