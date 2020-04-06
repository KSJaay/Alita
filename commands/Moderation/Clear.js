const Discord = require("discord.js"),
fetch = require("node-fetch");
const config = require("../../config.json");

module.exports = {
      //Command Information
      name: "clear",
      description: "Clear specific number of messages",
      usage: "Clear {Amount}",
      enabled: true,
      guildOnly: true,
      aliases: [],
      memberPermissions: ["MANAGE_MESSAGES"],
      botPermissions: ["MANAGE_MESSAGES"],
      nsfw: false,
      cooldown: 5000,
      ownerOnly: false,

    async execute(client, message, args) {

      let toClear = parseInt(args[0]) + 1;
      if(isNaN(toClear) || !args[0]){
        return message.channel.send("I can't delete this many messages")
      }
      //Delete the messages
      if(args[0] > 0 && args[0] < 101){
      message.channel
        .bulkDelete(toClear)
        .then(messages => {
          var content =null;
          messages.forEach(msg => {
            if(msg.author.bot === true){
              return;
            }

            var time = msg.createdTimestamp;
            var date = new Date(time);
            var fullmsg = msg.content
            if(msg.attachments.size > 0){
              msg.attachments.forEach(at =>{
                fullmsg += "\nAttachments: " + at.proxyURL +"\n"
              })
            }

            content += msg.author.username + "#" + msg.author.discriminator + " deleted message in #" + msg.channel.name + " at " + date.toString() + "\n" + `Message(ID:${msg.id}) - `+ fullmsg + "\n\n"

          })
          return getHaste(content);
        })
        .catch(console.error);

}
      //Add the messages to hastebin
      async function getHaste(content){
          let res = await fetch("https://hasteb.in/documents", {
              method: "POST",
              body: content,
              headers: { "Content-Type": "text/plain" }
          });

          let json = await res.json();

          if(!json.key){
              return message.channel.send("Some error occured");
          }
          let url = "https://hasteb.in/"+json.key+".txt";

          let embed = new Discord.MessageEmbed()
              .setAuthor("Deleted messages")
              .setDescription(url)
              .setColor(config.color);
          return message.channel.send(embed);
      }




        },


};
