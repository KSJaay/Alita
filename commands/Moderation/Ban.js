const Discord = require("discord.js");
const resolve = require("../../modules/Resolve.js");
module.exports = {
      //Command Information
      name: "ban",
      description: "Ban a member from your server",
      usage: "ban @user",
      enabled: true,
      guildOnly: true,
      aliases: [],
      memberPermissions: ["BAN_MEMBERS"],
      botPermissions: ["BAN_MEMBERS"],
      nsfw: false,
      cooldown: 5000,
      ownerOnly: false,

    async execute(client, message, args) {
      //Get the member
      let user = await resolve.getMember(args[0], message.guild);
      //Check if this is a real member
      if(!user){
          return message.channel.send("Sorry can't find this member currently, maybe they moved houses.");
      }
      //Check if member ID matches author ID
      if(user.id === message.author.id){
          return message.channel.send("You really tryna ban yourself??");
      }

      let member = await message.guild.members.fetch(user.id).catch(() => {});
      //Check if member can be banned
      if(member && !member.bannable){
          return message.channel.send("You don't have permissions to ban this member");
      }

     // Ban the member and return message
     message.guild.members.ban(user)
     return message.channel.send(`${user.user.username} has been banned from the server!`)



    },
};
