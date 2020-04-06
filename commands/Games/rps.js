const Discord = require("discord.js");
const config = require("../../config.json");

module.exports = {
    //Command Information
    name: "rps",
    description: "Play a game of rock-paper-scissors",
    usage: "rps",
    enabled: true,
    guildOnly: true,
    aliases: [],
    memberPermissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 5000,
    ownerOnly: false,

    async execute(client, message, args) {

      //Set up your own custom emotes for Rock,Paper and Scissors

      //https://cdn.discordapp.com/emojis/612074570614177809.png?v=1
      const rock = client.emojis.cache.get("612074570614177809");
      //https://cdn.discordapp.com/emojis/612275612240969738.png?v=1
      const paper = client.emojis.cache.get("612275612240969738");
      //https://cdn.discordapp.com/emojis/612074614494855178.png?v=1
      const scissors = client.emojis.cache.get("612074614494855178");

        let embed = new Discord.MessageEmbed()
           .setAuthor(message.author.tag, message.author.displayAvatarURL())
           .setDescription("Choose your weapon!")
           .setColor(config.color)
           .setTimestamp();

        //Send a message
        const m = await message.channel.send(embed);
        //Add reactions to that message
        const react1 = await m.react(rock);
        const react2 = await m.react(paper);
        const react3 = await m.react(scissors);
        //Create an array of our choices
        const chooseArr = [rock, paper, scissors];
        //Pick a random choice (For the bot)
        const randChoice = await chooseArr[Math.floor(Math.random()*chooseArr.length)];

        //Get the users reaction from the message
        let collector = await m.createReactionCollector((reacted, user) => user.id === message.author.id);


        //Collect the users reaction
        collector.on("collect", async(reaction, user) => {

          //Embeds for win, draw and loss
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

        //Methods of winning
        if((reaction._emoji === rock && randChoice === scissors) || (reaction._emoji === paper && randChoice === rock) || (reaction._emoji === scissors && randChoice === paper)) {
          m.delete()
          message.channel.send(winEmbed)
        //Tie if user emoji and ranodm emoji are the same
        }else if(reaction._emoji === randChoice){
          m.delete()
          message.channel.send(tieEmbed)

        //Else the user loses
        }else{
          m.delete()
          message.channel.send(lostEmbed)
        }

        });

    },
};
