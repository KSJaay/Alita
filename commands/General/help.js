const Discord = require("discord.js");
const tools = require("../../modules/Tools.js");

module.exports = {
      //Command Information
      name: "help",
      description: "Get a list of the commands the bot offers",
      usage: "help [Command]",
      enabled: true,
      guildOnly: true,
      aliases: [],
      memberPermissions: [],
      botPermissions: [],
      nsfw: false,
      cooldown: 5000,
      ownerOnly: false,

    async execute(client, message, args) {
            //Return all the commands
            let infoEmbed = await tools.MapCats(client)
            return message.channel.send(infoEmbed);

    },
};
