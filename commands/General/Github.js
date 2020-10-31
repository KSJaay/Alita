const Discord = require("discord.js"),
fetch = require('node-fetch');

module.exports = {
    //Command Information
    name: "github",
    description: "Get information about a Github repository",
    usage: "github [user] [repository]",
    enabled: true,
    aliases: [],
    category: "General",
    memberPermissions: [],
    botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
    nsfw: false,
    cooldown: 3000,
    ownerOnly: false,

    async execute(client, message, args, data) {
      // Check for username and repository name
      // If they don't exist set defualt to KSJaay/Alita
      let user = !args[0] ? "KSJaay" : args[0];
      let repo = !args[1] ? "Alita" : args[1];

      // Fetch repository from github API
      let uri = await fetch(`https://api.github.com/repos/${user}/${repo}`);

      // Check the fetch status, if it's 200 then return embed with information
      if(uri.status === 200){
        let uriJson = await uri.json();
        let embed = new Discord.MessageEmbed()
        .setAuthor(uriJson.owner.login, uriJson.owner.avatar_url)
        .setDescription(`${uriJson.description}\n[Repository Link](${uriJson.html_url})\n`)
        .addField("Repo Name :notepad_spiral:", `${uriJson.name}`, true)
        .addField("Stars :star:", `${uriJson.stargazers_count}`, true)
        .addField("Forks :gear:", `${uriJson.forks}`, true)
        .addField("Language :desktop:", `${uriJson.language}`, true)
        .setImage(uriJson.owner.avatar_url)
        .setColor(data.config.color)
        .setFooter(data.config.footer)
        return message.channel.send(embed)
      }else{
        // If fetch status isn't 200 then return error
        return message.channel.send("Unable to find the mentioned repository. Please make sure you have entered the correct user/repository. `a!github [user] [repository]`")
      }


    },
};
