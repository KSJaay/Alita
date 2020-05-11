const Discord = require("discord.js");
const randomPuppy = require('random-puppy');

module.exports = {
      //Command Information
      name: "meirl",
      description: "Get your daily dose of meirl.",
      usage: "-ameirl",
      enabled: true,
      guildOnly: true,
      aliases: [],
      memberPermissions: [],
      botPermissions: [],
      nsfw: false,
      cooldown: 5000,
      ownerOnly: false,

    async execute(client, message, args, data) {

      randomPuppy("meirl")
          .then(url => {
              let embed = new Discord.MessageEmbed()
              .setImage(url)
              .setTitle("meirl")
              .setURL("https://www.reddit.com/r/meirl")
              .setColor(data.config.color)
              .setFooter(data.config.footer)
              return message.channel.send(embed)
          })

    },
};
