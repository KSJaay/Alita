const Discord = require("discord.js");
const config = require("../../config.json");
const ApexTab = require("apexlegendsjs");
module.exports = {
      //Command Information
      name: "apex",
      description: "Apex Stats for a user",
      usage: "apex {Platform} {Username}",
      category: "Stats",
      enabled: true,
      guildOnly: true,
      aliases: [],
      memberPermissions: [],
      botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
      nsfw: false,
      cooldown: 5000,
      ownerOnly: false,

    async execute(client, message, args) {

            if(!config.trackergg || config.trackergg.length === ""){
                return message.channel.send("Unable to find command");
            }
            let apexStats = new ApexTab(config.trackergg);

            let platform = args[0].toUpperCase();
            if(!platform || (platform != "PC" && platform != "XBOX" && platform != "PSN")){
                return message.channel.send("Please mention a valid platform (PC, XBOX or PSN)");
            }

            let user = args.slice(1).join(" ");
            if(!user){
                return message.channel.send("Please mention a valid username");
            }



            apexStats.getDetailedPlayer(user, platform) //or XBOX or PSN
              .then((dataPulled)=>{
                  let level = dataPulled.metadata.level;
                  let rankName = dataPulled.metadata.rankName;
                  let rankImage = dataPulled.metadata.rankImage;
                  let playerImage = dataPulled.metadata.avatarUrl;

                    // Send embed
                    let embed = new Discord.MessageEmbed()
                    .setAuthor(`Apex data for ${dataPulled.metadata.platformUserHandle} on ${platform}`, playerImage)
                    .setThumbnail(rankImage)
                    .addFields(
                    { name: `Rank`, value: rankName},
                    { name: `Level`, value: level}
                  )

                  let i = 0;
                  let arrSize = dataPulled.stats;

                    for (i = 0; i < arrSize.length; i++) {
                      if(dataPulled.stats[i].value <= 0){

                      }else if(dataPulled.stats[i].value >= 1){

                      embed.addFields({ name: dataPulled.stats[i].metadata.name, value: dataPulled.stats[i].value})
                      }
                    }
                    embed.setColor(config.color)
                    .setFooter(config.footer);
                     return message.channel.send(embed);


              })
              .catch((err)=>{
                  console.log(err)
                  return message.channel.send("ERROR! Unable to find this user. Please try again")
            })


    },
};
