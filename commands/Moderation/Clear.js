const Discord = require("discord.js");
const config = require("../../config.json");

module.exports = {
      //Command Information
      name: "clear",
      description: "Clear specific number of messages",
      usage: "Clear {Amount}",
      enabled: true,
      guildOnly: true,
      aliases: [],
      memberPermissions: ["MANAGE_MESSAGES"],
      botPermissions: ["MANAGE_MESSAGES"],
      nsfw: false,
      cooldown: 5000,
      ownerOnly: false,

    async execute(client, message, args, data) {

      let toClear = parseInt(args[0]) + 1;
      if(isNaN(toClear) || !args[0]){
        return message.channel.send("I can't delete this many messages")
      }
      //Delete the messages
      if(args[0] > 0 && args[0] < 101){
      message.channel
        .bulkDelete(toClear);
          const msg = await message.channel.send(toClear + " Messages cleared")

          setTimeout(function(){
              msg.delete();
          }, 4000);
        }

    },
};
