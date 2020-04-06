const Discord = require("discord.js");
const config = require("../../config.json");

module.exports = {
    //Command Information
    name: "rps",
    description: "Play a game of rock-paper-scissors",
    usage: "rps",
    category: "Games",
    enabled: true,
    guildOnly: true,
    aliases: [],
    memberPermissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 5000,
    ownerOnly: false,

    async execute(client, message, args) {

      const rock = "🧱";
      const paper = "📝";
      const scissors = "✂️";

        //Embeds

        let embed = new Discord.MessageEmbed()
           .setAuthor(message.author.tag, message.author.displayAvatarURL())
           .setDescription("Choose your weapon!")
           .setColor(config.color)
           .setTimestamp();

        const m = await message.channel.send(embed);
        const react1 = await m.react(rock);//(m, message.author, 30, chooseArr);
        const react2 = await m.react(paper);
        const react3 = await m.react(scissors);
        const chooseArr = [rock, paper, scissors];
        const randChoice = await chooseArr[Math.floor(Math.random()*chooseArr.length)];

        let collector = await m.createReactionCollector((reacted, user) => user.id === message.author.id);



        collector.on("collect", async(reaction, user) => {

          let winEmbed = new Discord.MessageEmbed()
              .setAuthor(message.author.tag, message.author.displayAvatarURL())
              .setDescription(`You won!`)
              .addFields({name: "Results:", value: `${reaction._emoji} vs ${randChoice}`})
              .setColor("GREEN")
              .setTimestamp();

          let tieEmbed = new Discord.MessageEmbed()
              .setAuthor(message.author.tag, message.author.displayAvatarURL())
              .setDescription(`You tied!`)
              .addFields({name: "Results:", value: `${reaction._emoji} vs ${randChoice}`})
              .setColor(config.color)
              .setTimestamp();

          let lostEmbed = new Discord.MessageEmbed()
              .setAuthor(message.author.tag, message.author.displayAvatarURL())
              .setDescription(`You lost!`)
              .addFields({name:"Results:", value: `${reaction._emoji} vs ${randChoice}`})
              .setColor("RED")
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

    },
};
