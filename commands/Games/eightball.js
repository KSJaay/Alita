const Discord = require("discord.js");

module.exports = {
    //Command Information
    name: "eightball",
    description: "Let eightball answer your questions",
    usage: "-eightball {question}",
    enabled: true,
    guildOnly: true,
    aliases: ["8ball"],
    memberPermissions: [],
    botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    nsfw: false,
    cooldown: 3000,
    ownerOnly: false,

    async execute(client, message, args, data) {

      //Replies for eightball
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

      //Choose a random reply
      const answers = options[Math.floor(Math.random() * options.length)];
      //Get the users question
      const question = message.content.split(' ').slice(1);

      //If there's no question then return error message
      if(!question || !args[0]){
        return message.channel.send("Please ask a valid question.")
      }
      //If the message length is longer than 1024 character return
      if(question.length > 1024){
        return message.channel.send("Question length is too long, make sure it's shorter than 1024 Characters.\nCurrent characters: " + question.length)
      }

      //Create an embed with question and answer
      const embed = new Discord.MessageEmbed()
      .addField("Question", question.join(' '))
      .addField( "Answer", answers)
      .setColor('#fffffe')
      .setAuthor(message.author.tag, message.author.displayAvatarURL());

      //Reply with the answer
      return message.channel.send(embed)




    },
};
