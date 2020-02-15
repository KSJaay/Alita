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
      console.log(member)

      let announcementEmbed = new Discord.MessageEmbed()
      .setAuthor(user.username, user.displayAvatarURL())
      .setThumbnail(user.displayAvatarURL())
      .setFooter(db.config.embed.footer)
      .setColor(db.config.embed.color)
      .addField("ID", userID, true)
      .addField("Username", userName,true)
      .addField("Created Discord", `${joinedDate.toLocaleDateString()}`)
      .addField("Joined server", `${memberJoined.toLocaleDateString()}`)
      .addField("Member color", memberColor, true)
      .addField("Highest role", member.roles.highest, true)
      .addField("Total roles", member.roles.cache.size)


      if(userStatus === "dnd"){
        announcementEmbed.addField("Staus", ":red_circle: Do not disturb")
      }else if(userStatus === "idle"){
        announcementEmbed.addField("Staus", ":yellow_circle: Idle")
      }else if(userStatus === "online"){
        announcementEmbed.addField("Staus", ":green_circle: Online")
      }else if(userStatus === "offline"){
        announcementEmbed.addField("Staus", ":white_circle: Offline")
      }else{
        announcementEmbed.addField("Staus", "IDK")
      }

      return message.channel.send(announcementEmbed)
    }
  }


module.exports = Userinfo;
