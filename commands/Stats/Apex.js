const Discord = require("discord.js");
const config = require("../../config.json");
const fetch = require("node-fetch");
module.exports = {
      //Command Information
      name: "apex",
      description: "Apex Stats for a user",
      usage: "apex {Platform} {Username}",
      enabled: true,
      guildOnly: true,
      aliases: [],
      memberPermissions: [],
      botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
      nsfw: false,
      cooldown: 5000,
      ownerOnly: false,

    async execute(client, message, args, data) {

            //Check if there's an API key in config
            if(!config.trackergg || config.trackergg.length === ""){
                return message.channel.send("Unable to find command");
            }

            //Get the platform the user entered
            let platform = args[0] ? args[0].toLowerCase() : "origin";

            //If the platform isn't the following then return error message
            if((platform != "origin" && platform != "xbl" && platform != "psn")){
                return message.channel.send("Please mention a valid platform (Origin, xbl or PSN)");
            }

            //Get the username
            let user = args.slice(1).join(" ");

            //If there isn't a username return error
            if(!user){
                return message.channel.send("Please mention a valid username");
            }

            const headers = { headers: { 'TRN-Api-Key': config.trackergg } };

            fetch(`https://public-api.tracker.gg/v2/apex/standard/profile/${platform}/${user}`, headers)
            .then(res => res.json())
            .then(json => {
              if(json.errors){
                return message.channel.send("Uh-Oh! Looks like we couldn't find your profile. Please make sure the platform and Username are correct.")
              }

              let embed = new Discord.MessageEmbed()
              .setAuthor(`Apex Stats ${json.data.platformInfo.platformUserId}`, json.data.platformInfo.avatarUrl)

              for(let i = 0; i < json.data.segments.length; i++){
                let objName = Object.getOwnPropertyNames(json.data.segments[i].stats)
                var desc = "";
                for(let j = 0; j < objName.length; j++){
                  desc += (json.data.segments[i].stats[objName[j]].displayName + ": " + json.data.segments[i].stats[objName[j]].displayValue + "\n");
                }
                embed.addField(json.data.segments[i].metadata.name, desc)
              }
              embed.setColor(config.color)
              .setFooter(config.footer);

              return message.channel.send(embed)

            });



    },
};
