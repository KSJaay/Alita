const Discord = require("discord.js");
const { prefix, ownerID } = require("../config.json");
const embeds = require("../modules/Embeds.js");
const cmdCooldown = {};

module.exports = (client, message) => {

    // CHECKS
    if (message.author.bot) return;
    if (message.content.indexOf(prefix) !== 0) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);

    const commandName = args.shift().toLowerCase();

    //Find the command and it's aliases
    const cmd = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    //Return if it isn't a command
    if (!cmd) return;

    //Return if command is ran in dms
    if (cmd.guildOnly) {
        if (message.channel.type === "dm") return embeds.Error();
    }

    //Return if command isn't enabled
    if(!cmd.enabled){
      return;
    }

    //If channel isn't nsfw and command is return error
    if(!message.channel.nsfw && cmd.nsfw){
      return embeds.nsfw(message);
    }
    //If command is owner only and author isn't owner return
    if(cmd.ownerOnly && message.author.id !== ownerID){
      return;
    }

    //Check if user has permissions to run the command
    if(message.guild){
      let neededPerms = [];
      if(!message.channel.permissionsFor(message.member).has("SEND_MESSAGES")){
          neededPerms.push("SEND_MESSAGES");
      }

      cmd.botPermissions.forEach((perm) => {
      if(!message.channel.permissionsFor(message.member).has(perm)){
          neededPerms.push(perm);
        }
      });

      if(neededPerms.length > 0){
          return message.channel.send("Looks like you're missing the following permissions:\n" +neededPerms.map((p) => `\`${p}\``).join(", "));
      }

    }
    //Check if bot has permissions to run the command
    if(message.guild){
      let neededPerms = [];

      if(!message.channel.permissionsFor(message.member).has("SEND_MESSAGES")){
          neededPerms.push("SEND_MESSAGES");
      }

      if(!message.channel.permissionsFor(message.member).has("EMBED_LINKS")){
          return message.channel.send("I need permission to send EMBED_LINKS")
      }

      cmd.botPermissions.forEach((perm) => {
      if(!message.channel.permissionsFor(message.guild.me).has(perm)){
          neededPerms.push(perm);
          }
      });

      if(neededPerms.length > 0){
          return message.channel.send("Looks like I'm missing the following permissions:\n" +neededPerms.map((p) => `\`${p}\``).join(", "));
      }

    }

    //Try to execute the commands and add cooldown for user
    try {
        cmd.execute(client, message, args);

        let userCooldown = cmdCooldown[message.author.id];
        if(!userCooldown){
            cmdCooldown[message.author.id] = {};
            userCooldown = cmdCooldown[message.author.id];
        }
        let time = userCooldown[cmd.name] || 3000;
        if(time && (time > Date.now())){
          let timeLeft = Math.ceil((time-Date.now())/1000);
            return embeds.Cooldown(message, timeLeft);
        }
        cmdCooldown[message.author.id][cmd.name] = Date.now() + cmd.cooldown;

        client.logger.cmd(`${message.author.tag} used ${commandName}`);
    }
    //If an error occurs catch it and console log it
    catch (err) {
        console.error(err);
    }
};
