const Command = require("../../base/Command.js"),
Discord = require("discord.js");
const ApexTab = require("apexlegendsjs");

class Apex extends Command {

    async run (message, args, data) {

      let apexStats = new ApexTab(data.config.api.trackergg);

      if(!data.config.api.trackergg || data.config.api.trackergg.length === ""){
          return message.channel.send("Unable to find command");
      }

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
              embed.setColor(data.config.embed.color)
              .setFooter(data.config.embed.footer);
               return message.channel.send(embed);


        })
        .catch((err)=>{
            console.log(err)
            return message.channel.send("ERROR! Unable to find this user. Please try again")
      })


}


    constructor (client) {
        super(client, {
            name: "apex",
            description: "Apex Stats for a user",
            usage: "Apex {Platform} {Username}",
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            nsfw: false,
            aliases: [],
            memberPermissions: [],
            botPerms: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            ownerOnly: false,
            cooldown: 1000
        });
    }
}

module.exports = Apex;
