const Discord = require("discord.js");
//const imageToAscii = require("image-to-ascii");
const figlet = require("figlet");
const { promisify } = require("util");
const figletAsync = promisify(figlet);

module.exports = {
      //Command Information
      name: "flip",
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

      let text = args.join(' ');

      if(!text){
        return message.channel.send("Please enter text you want to flip")
      }

      let flipped = await flipString(text);

      function flipString(str) {
          var newString = "";
          for (var i = str.length - 1; i >= 0; i--) {
              newString += str[i];
          }
          return newString;
      }

      return message.channel.send(flipped);

    },
};
