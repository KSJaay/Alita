const Discord = require("discord.js");
const randomPuppy = require('random-puppy');

module.exports = {
      //Command Information
      name: "chucknorris",
      description: "Get your daily dose of  chucknorris.",
      usage: "-achucknorris",
      enabled: true,
      guildOnly: true,
      aliases: [],
      memberPermissions: [],
      botPermissions: [],
      nsfw: false,
      cooldown: 5000,
      ownerOnly: false,

    async execute(client, message, args, data) {

      randomPuppy("chucknorris")
          .then(url => {
              let embed = new Discord.MessageEmbed()
              .setImage(url)
              .setTitle("chucknorris")
              .setURL("https://www.reddit.com/r/chucknorris")
              .setColor(data.config.color)
              .setFooter(data.config.footer)
              return message.channel.send(embed)
          })

    },
};
