const Discord = require("discord.js");
const randomPuppy = require('random-puppy');

module.exports = {
      //Command Information
      name: "copypasta",
      description: "Get your daily dose of copypasta.",
      usage: "-acopypasta",
      enabled: true,
      guildOnly: true,
      aliases: [],
      memberPermissions: [],
      botPermissions: [],
      nsfw: false,
      cooldown: 5000,
      ownerOnly: false,

    async execute(client, message, args, data) {

      randomPuppy("copypasta")
          .then(url => {
              let embed = new Discord.MessageEmbed()
              .setImage(url)
              .setTitle("copypasta")
              .setURL("https://www.reddit.com/r/copypasta")
              .setColor(data.config.color)
              .setFooter(data.config.footer)
              return message.channel.send(embed)
          })

    },
};
