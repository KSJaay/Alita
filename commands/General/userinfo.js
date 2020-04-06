const Discord = require("discord.js");
const config = require("../../config.json");

module.exports = {
    //Command Information
    name: "userinfo",
    description: "Find information about your profile or a user in your server",
    usage: "userinfo",
    category: "General",
    enabled: true,
    guildOnly: true,
    aliases: ["ui"],
    memberPermissions: [],
    botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    nsfw: false,
    cooldown: 5000,
    ownerOnly: false,
    async execute(client, message, args) {

      let user = message.author;
      let userID = user.id;
      let userName = user.tag;
      let joinedDate = user.createdAt;
      let userStatus = user.presence.status;

      let member = null;
      if(message.guild){
          member = await message.guild.members.fetch(user).catch((err) => {});
      }

      let memberColor = member.displayHexColor;
      let memberHRole = member.roles.highest;
      let memberJoined = member.joinedAt;
      //console.log(member)

      let announcementEmbed = new Discord.MessageEmbed()
      .setAuthor(user.username, user.displayAvatarURL())
      .setThumbnail(user.displayAvatarURL())
      .setFooter(config.footer)
      .setColor(config.color)
      .addFields(
        { name: 'Username', value: userName, inline: true },
        { name: 'Created Discord', value: joinedDate.toLocaleDateString(), inline: false },
        { name: 'Joined server', value: memberJoined.toLocaleDateString(), inline: false },
        { name: 'Member color', value: memberColor, inline: true },
        { name: 'Highest role', value: member.roles.highest, inline: true },
        { name: 'Total roles', value: member.roles.cache.size, inline: true },
        { name: 'Status', value: memberColor, inline: true },
      )

       if(userStatus === "dnd"){
         announcementEmbed.addFields({ name: 'Status', value: ":red_circle: Do not disturb", inline: true })
       }else if(userStatus === "idle"){
         announcementEmbed.addFields({ name: 'Status', value: ":yellow_circle: Idle", inline: true })
       }else if(userStatus === "online"){
           announcementEmbed.addFields({ name: 'Status', value: ":green_circle: Online", inline: true })
       }else if(userStatus === "offline"){
           announcementEmbed.addFields({ name: 'Status', value: ":white_circle: Offline", inline: true })
       }else{
       }

      return message.channel.send(announcementEmbed)


    },
};
