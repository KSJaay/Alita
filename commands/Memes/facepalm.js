const Discord = require("discord.js");
const randomPuppy = require('random-puppy');

module.exports = {
      //Command Information
      name: "facepalm",
      description: "Get your daily dose of facepalm.",
      usage: "-afacepalm",
      enabled: true,
      guildOnly: true,
      aliases: [],
      memberPermissions: [],
      botPermissions: [],
      nsfw: false,
      cooldown: 5000,
      ownerOnly: false,

    async execute(client, message, args, data) {

      randomPuppy("facepalm")
          .then(url => {
              let embed = new Discord.MessageEmbed()
              .setImage(url)
              .setTitle("facepalm")
              .setURL("https://www.reddit.com/r/facepalm")
              .setColor(data.config.color)
              .setFooter(data.config.footer)
              return message.channel.send(embed)
          })

    },
};
