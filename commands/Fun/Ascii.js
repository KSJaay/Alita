const Discord = require("discord.js");
//const imageToAscii = require("image-to-ascii");
const figlet = require("figlet");
const { promisify } = require("util");
const figletAsync = promisify(figlet);

module.exports = {
      //Command Information
      name: "ascii",
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

      let conv = args.join(' ');

      if(conv.length > 20){
        return message.channel.send("Please make sure the character size is less than 25 characters.")
      }

      let converted = await figletAsync(conv);
      return message.channel.send("```"+converted+"```");

    },
};
