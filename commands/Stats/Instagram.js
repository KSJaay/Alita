const Discord = require("discord.js");
const helper = require("./../../helpers/Stats/Instagram.js");
module.exports = {
    //Command Information
    name: "instagram",
    description: "Get information about a user's Instagram",
    usage: "instagram {user}",
    enabled: true,
    aliases: [],
    category: "Statistics",
    memberPermissions: [],
    botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
    nsfw: false,
    cooldown: 3000,
    ownerOnly: false,

    async execute(client, message, args, data) {

      let userID = !args[0] ? "KSJaay" : args[0];

      let instaData = await helper.fetchAccount(userID)

      if(!instaData){
        return message.channel.send("Unable to find the mentioned Instagram account.")
      };
      // Get the top liked image
      let topImage;
      if(instaData.imageData.length > 0){
        topImage = instaData.imageData[0];
      }else{
        topImage = {
          likes: 0,
          comments: 0,
          image: message.client.user.displayAvatarURL()
        }
      }

      let embed = new Discord.MessageEmbed()
      .setTitle(instaData.name)
      .setURL(`https://www.instagram.com/${instaData.id}`)
      .setThumbnail(instaData.image)
      .setDescription(instaData.bio)
      .addField("Followers", instaData.followers, true)
      .addField("Following", instaData.following, true)
      .setImage(topImage.image)
      .setFooter(`👍 ${topImage.likes} 💬 ${topImage.comments}`)
      .setColor(data.config.color)

      return message.channel.send(embed)
    },
};
