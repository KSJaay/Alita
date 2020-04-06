const Discord = require("discord.js");
const config = require("../../config.json"),
fortnite = require("fortnite");

module.exports = {
      //Command Information
      name: "fortnite",
      description: "Fortnite Stats for a user",
      usage: "fortnite {Platform} {Username}",
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

        let fortniteData = new fortnite(config.trackergg);

        let platform = args[0].toLowerCase();
        if(!platform || (platform != "pc" && platform != "xbox" && platform != "psn")){
            return message.channel.send("Please mention a valid platform");
        }

        let user = args.slice(1).join(" ");
        if(!user){
            return message.channel.send("Please mention a valid username");
        }

        fortniteData.user(user, platform).then(async (fortData) => {

            let lfWins = fortData.stats.lifetime.wins;
            let ltAvgKills = (fortData.stats.lifetime.kills / fortData.stats.lifetime.matches);
            let ltKills = fortData.stats.lifetime.kills;
            let ltMatches = fortData.stats.lifetime.matches;
            let ltWinPercent = (fortData.stats.lifetime.wins / fortData.stats.lifetime.matches * 100);
            let ltKD = fortData.stats.lifetime.kd;

            let soloAvgKills = (fortData.stats.solo.kills / fortData.stats.solo.matches);
            let soloKD = fortData.stats.solo.kd;
            let soloWins = fortData.stats.solo.wins;
            let soloKills = fortData.stats.solo.kills;
            let winsSoloPercent = (fortData.stats.solo.wins / fortData.stats.solo.matches * 100);
            let soloMatches = fortData.stats.solo.matches;

            let duoAvgKills = (fortData.stats.duo.kills / fortData.stats.duo.matches);
            let duoKD = fortData.stats.duo.kd;
            let duoWins = fortData.stats.duo.wins;
            let duoKills = fortData.stats.duo.kills;
            let winsDuoPercent = (fortData.stats.duo.wins / fortData.stats.duo.matches * 100);
            let duoMatches = fortData.stats.duo.matches;

            let squadAvgKills = (fortData.stats.squad.kills / fortData.stats.squad.matches);
            let squadKD = fortData.stats.squad.kd;
            let squadWins = fortData.stats.squad.wins;
            let squadKills = fortData.stats.squad.kills;
            let squadPercent = (fortData.stats.squad.wins / fortData.stats.squad.matches * 100);
            let squadMatches = fortData.stats.squad.matches;


            // Send embed
            let embed = new Discord.MessageEmbed()
            .setDescription(`Data for ${fortData.username} on ${platform}`)
            .addFields(
            { name: `Lifetime`, value: `Average Kills: ${ltAvgKills.toFixed(2)}\nKills: ${ltKills}\nMatches: ${ltMatches}\nWins: ${lfWins}\nWin Rate: ${ltWinPercent.toFixed(2)}%\nK/D: ${ltKD}`},
            { name: `Solo`, value: `Average Kills: ${soloAvgKills.toFixed(2)}\nKills: ${soloKills}\nMatches: ${soloMatches}\nWins: ${soloWins}\nWin Rate: ${winsSoloPercent.toFixed(2)}%\nK/D: ${soloKD}`},
            { name: `Duos`, value: `Average Kills: ${duoAvgKills.toFixed(2)}\nKills: ${duoKills}\nMatches: ${duoMatches}\nWins: ${duoWins}\nWin Rate: ${winsDuoPercent.toFixed(2)}%\nK/D: ${duoKD}`},
            { name: `Squads`, value: `Average Kills: ${squadAvgKills.toFixed(2)}\nKills: ${squadKills}\nMatches: ${squadMatches}\nWins: ${squadWins}\nWin Rate: ${squadPercent.toFixed(2)}%\nK/D: ${squadKD}`},
          )

            // .setColor(data.config.embed.color)
            // .setFooter(data.config.embed.footer);
            return message.channel.send(embed);




        }).catch((err) => {
            console.log(err)
            return message.channel.send("Unable to find user");
        });



    },
};
