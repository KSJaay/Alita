const Discord = require("discord.js");
const fetch = require('node-fetch');

module.exports = {
      //Command Information
      name: "advice",
      description: "",
      usage: "",
      enabled: true,
      guildOnly: true,
      aliases: [],
      memberPermissions: [],
      botPermissions: [],
      nsfw: false,
      cooldown: 5000,
      ownerOnly: false,

    async execute(client, message, args, data) {

      let infoWeb = await fetch('http://api.adviceslip.com/advice')
      let advice = await infoWeb.json();

      return message.channel.send(advice.slip.advice)

    },
};
