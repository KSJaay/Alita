const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class EightBall extends Command {

    async run (message, args, db) {

      var options = [
        "It is certain",
        "It is decidedly so",
        "Without a doubt",
        "Yes – definitely",
        "You may rely on it",
        "As I see it, yes",
        "Most likely",
        "Outlook good",
        "Yes",
        "Signs point to yes",
        "Don’t count on it",
        "My reply is no",
        "My sources say no",
        "Outlook not so good",
        "Very doubtful",
        "Reply hazy, try again",
        "Ask again later",
        "Better not tell you now",
        "Cannot predict now",
        "Concentrate and ask again"
      ];

      const answers = options[Math.floor(Math.random() * options.length)];
      const question = message.content.split(' ').slice(1);
      if(!question || !args[0]){
        return message.channel.send("Please ask a valid question.")
      }
      if(question.length > 1024){
        return message.channel.send("Question length is too long, make sure it's shorter than 1024 Characters.\nCurrent characters: " + question.length)
      }

      const embed = new Discord.MessageEmbed()
      .addFields({name: "Question", value: question.join(' ')},
                 {name: "Answer", value: answers})
      .setColor('#fffffe')
      .setAuthor(message.author.tag, message.author.displayAvatarURL());

      return message.channel.send(embed)
    }


    constructor (client) {
        super(client, {
            name: "eightball",
            description: "Ask eightball a question",
            usage: "eightball {Question}",
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            nsfw: false,
            aliases: ["8ball", "eball"],
            memberPermissions: [],
            botPerms: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            ownerOnly: false,
            cooldown: 1000
        });
    }




}

module.exports = EightBall;
