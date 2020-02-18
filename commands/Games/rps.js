const Command = require("../../base/Command.js");
const Discord = require("discord.js");
class Rps extends Command {

    constructor (client) {
        super(client, {
          name: "rps",
          description: "Play a game of rock-paper-scissors"),
          usage: "rps",
          dirname: __dirname,
          enabled: true,
          guildOnly: true,
          aliases: ["rock-paper-scissors"],
          memberPermissions: [],
          botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
          nsfw: false,
          ownerOnly: false,
          cooldown: 1000
        });
    }



    async run (message, args, data) {

          const rock = this.client.emojis.cache.get("631599767620812830");
          //https://cdn.discordapp.com/emojis/631599767620812830.png?v=1
          const paper = this.client.emojis.cache.get("631600472817401916");
          //https://cdn.discordapp.com/emojis/631600472817401916.png?v=1
          const scissors = this.client.emojis.cache.get("631600303451406336");
          //https://cdn.discordapp.com/emojis/631600303451406336.png?v=1


            //Embeds

            let embed = new Discord.MessageEmbed()
               .setAuthor(message.author.tag, message.author.displayAvatarURL())
               .setDescription("Choose your weapon!")
               .setColor(data.config.embed.color)
               .setTimestamp();

            const m = await message.channel.send(embed);
            const react1 = await m.react(rock);//(m, message.author, 30, chooseArr);
            const react2 = await m.react(paper);
            const react3 = await m.react(scissors);
            const chooseArr = [rock, paper, scissors];
            const randChoice = chooseArr[Math.floor(Math.random()*chooseArr.length)];

            let collector = m.createReactionCollector((reacted, user) => user.id === message.author.id);



            collector.on("collect", async(reaction, user) => {



              let winEmbed = new Discord.MessageEmbed()
                  .setAuthor(message.author.tag, message.author.displayAvatarURL())
                  .setDescription(`You won!`)
                  .addField("Results:", `${reaction._emoji} vs ${randChoice}`)
                  .setColor(data.config.embed.win)
                  .setTimestamp();

              let tieEmbed = new Discord.MessageEmbed()
                  .setAuthor(message.author.tag, message.author.displayAvatarURL())
                  .setDescription(`You tied!`)
                  .addField("Results:", `${reaction._emoji} vs ${randChoice}`)
                  .setColor(data.config.embed.color)
                  .setTimestamp();

              let lostEmbed = new Discord.MessageEmbed()
                  .setAuthor(message.author.tag, message.author.displayAvatarURL())
                  .setDescription(`You lost!`)
                  .addField("Results:", `${reaction._emoji} vs ${randChoice}`)
                  .setColor(data.config.embed.lost)
                  .setTimestamp();

            if((reaction._emoji === rock && randChoice === scissors) || (reaction._emoji === paper && randChoice === rock) || (reaction._emoji === scissors && randChoice === paper)) {
              m.delete()
              message.channel.send(winEmbed)

            }else if(reaction._emoji === randChoice){
              m.delete()
              message.channel.send(tieEmbed)
            }else{
              m.delete()
              message.channel.send(lostEmbed)
            }

          });

          }
        }





module.exports = Rps;
