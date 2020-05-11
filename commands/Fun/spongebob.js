const Discord = require("discord.js");
//const imageToAscii = require("image-to-ascii");
const figlet = require("figlet");
const { promisify } = require("util");
const figletAsync = promisify(figlet);

module.exports = {
      //Command Information
      name: "spongebob",
      description: "",
      usage: "",
      enabled: true,
      guildOnly: true,
      aliases: ["sb"],
      memberPermissions: [],
      botPermissions: [],
      nsfw: false,
      cooldown: 5000,
      ownerOnly: false,

    async execute(client, message, args, data) {

      let text = args.join(' ');

      if(!text){
        return message.channel.send("Please enter text you want to spongebob")
      }

      let bobbed = await bobString(text);

      function bobString(str) {
          var newString = "";
          var j = 0;
          for (var i = 0; i < str.length; i++) {
            if(j === 0){
            newString += str[i].toLowerCase();
            j++
          }else{
            newString += str[i].toUpperCase();
            j--
          }
          }
          return newString;
      }

      return message.channel.send(bobbed)

    },
};
