const Discord = require("discord.js");
const randomPuppy = require('random-puppy');

module.exports = {
      //Command Information
      name: "wholesome",
      description: "Get your daily dose of wholesome",
      usage: "-awholesome",
      enabled: true,
      guildOnly: true,
      aliases: [],
      memberPermissions: [],
      botPermissions: [],
      nsfw: false,
      cooldown: 5000,
      ownerOnly: false,

    async execute(client, message, args, data) {

      randomPuppy("wholesome")
          .then(url => {
              let embed = new Discord.MessageEmbed()
              .setImage(url)
              .setTitle("wholesome")
              .setURL("https://www.reddit.com/r/wholesome")
              .setColor(data.config.color)
              .setFooter(data.config.footer)
              return message.channel.send(embed)
          })

    },
};
