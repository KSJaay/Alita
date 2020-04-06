const Discord = require("discord.js");

module.exports = {
    //Command Information
    name: "eightball",
    description: "Let eightball answer your questions",
    usage: "-eightball {question}",
    category: "Games",
    enabled: true,
    guildOnly: true,
    aliases: ["8ball"],
    memberPermissions: [],
    botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    nsfw: false,
    cooldown: 3000,
    ownerOnly: false,

    async execute(client, message, args) {

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
      .addField("Question", question.join(' '))
      .addField( "Answer", answers)
      .setColor('#fffffe')
      .setAuthor(message.author.tag, message.author.displayAvatarURL());

      return message.channel.send(embed)




    },
};
