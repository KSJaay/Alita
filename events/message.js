const Discord = require("discord.js");
const config = require("./../config.json");
const cmdCooldown = {};

module.exports = async(client, message) => {
try {
  //If author is a bot then return
  if(message.author.bot) return;

  //If the message isn't in a guild return following message
  if(!message.guild){
    return message.channel.send("Please use my commands in your guild as they do not work in direct messages. Using `v!help` in your server to get started.")
  }

  //Get guild database
  let guildDB = await client.data.getGuildDB(message.guild.id)

  //Get prefix from guild else get from config file
  let prefix = !guildDB.prefix ? config.prefix : guildDB.prefix;

  //Check if message starts with the prefix
  if(!message.content.toLowerCase().startsWith(prefix)){
    if(message.content ===`<@!${message.client.user.id}>` || message.content ===`<@${message.client.user.id}>`){
      return message.reply("Uh-Oh! You forgot the prefix? It's `" + prefix + "`");
    }
    return;
  }

  //Checking if the message is a command
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const commandName = args.shift().toLowerCase();
  const cmd = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

  //If it isn't a command then return
  if(!cmd) return;

  //Get the user database
  let userDB = await client.data.getUserDB(message.author.id);
  let data = {};
  data.config = config;
  data.user = userDB;
  data.guild = guildDB;


  //If channel isn't nsfw and command is return error
  if(!message.channel.nsfw && cmd.nsfw){
    return //Error message
  }

  //If command is owner only and author isn't owner return
  if(cmd.ownerOnly && message.author.id !== config.ownerID){
    return;
  }

  if(message.guild){

    let userPerms = [];

    //Checking for members permission
    cmd.memberPermissions.forEach((perm) => {
    if(!message.channel.permissionsFor(message.member).has(perm)){
        userPerms.push(perm);
      }
    });

    //If user permissions arraylist length is more than one return error
    if(userPerms.length > 0 && !message.member.roles.cache.find((r) => r.name.toLowerCase() === config.adminRole.toLowerCase())){
        client.logger.cmd(`${message.author.tag} used ${cmd.name} - Missing permissions`);
        return message.channel.send("Looks like you're missing the following permissions:\n" +userPerms.map((p) => `\`${p}\``).join(", "));
    }

    let clientPerms = [];

    //Checking for client permissions
    cmd.botPermissions.forEach((perm) => {
    if(!message.channel.permissionsFor(message.guild.me).has(perm)){
        clientPerms.push(perm);
        }
    });

    //If client permissions arraylist length is more than one return error
    if(clientPerms.length > 0){
        client.logger.cmd(`${message.author.tag} used ${cmd.name} - Missing permissions`);
        return message.channel.send("Looks like I'm missing the following permissions:\n" +clientPerms.map((p) => `\`${p}\``).join(", "));
    }

  }

  let userCooldown = cmdCooldown[message.author.id];

  if(!userCooldown){
      cmdCooldown[message.author.id] = {};
      uCooldown = cmdCooldown[message.author.id];
  }

  let time = uCooldown[cmd.name] || 0;
  //Check if user has a command cooldown
  if(time && (time > Date.now())){
    let timeLeft = Math.ceil((time-Date.now())/1000);
    return //Error message
  }

    cmdCooldown[message.author.id][cmd.name] = Date.now() + cmd.cooldown;

    //Create a new log for the command
    client.data.getLogDB(message.author, message.guild, cmd);
    //Execute the command and log the user in console
    cmd.execute(client, message, args, data);
    client.logger.cmd(`${message.author.tag} used ${cmd.name}`);

  } catch(err) {
      console.error(err);
  }

};
