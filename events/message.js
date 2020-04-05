const Discord = require("discord.js");
const { prefix, ownerID } = require("../config.json");
const embed = require("../modules/Embeds");
const cmdCooldown = {};

module.exports = (client, message) => {
    // EMBED
    const embed = new Discord.MessageEmbed()
        .setColor("GREEN");

    // CHECKS
    if (message.author.bot) return;
    if (message.content.indexOf(prefix) !== 0) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);

    const commandName = args.shift().toLowerCase();

    //Find the command and it's aliases
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    //Return if it isn't a command
    if (!command) return;

    //Return if command is ran in dms
    if (command.guildOnly) {
        if (message.channel.type === "dm") return embed.Error();
    }

    //Return if command isn't enabled
    if(!command.enabled){
      return;
    }

    //If channel isn't nsfw and command is return error
    if(!message.channel.nsfw && command.nsfw){
      return embed.NSFW();
    }
    //If command is owner only and author isn't owner return
    if(command.ownerOnly && message.author.id !== ownerID){
      return;
    }


    try {
        command.execute(client, message, args);

        let userCooldown = cmdCooldown[message.author.id];
        if(!userCooldown){
            cmdCooldown[message.author.id] = {};
            userCooldown = cmdCooldown[message.author.id];
        }
        let time = userCooldown[command.name] || 0;
        if(time && (time > Date.now())){
          let timeLeft = Math.ceil((time-Date.now())/1000);
            return message.channel.send(embed.Cooldown(timeLeft));
        }
        cmdCooldown[message.author.id][command.name] = Date.now() + command.cooldown;

        client.logger.cmd(`${message.author.tag} used ${commandName}`);
    }
    catch (e) {
        console.error(e);
        client.errors.cmdError(message);
    }
};
