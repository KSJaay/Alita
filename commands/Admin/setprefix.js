const Discord = require('discord.js');

module.exports = {

  //Information about command
  name: "setprefix",
  desc: "Set the prefix for your server",
  usage: "setprefix [prefix]",
  enabled: true,
  aliases: ["prefix"],
  category: "Admin",
  userPermissions: [ "ADMINISTRATOR" ],
  botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
  //Settings for command
  nsfw: false,
  ownerOnly: false,
  donator: false,
  cooldown: 5000,

  //Execute to command once the settings have been checked
  async execute(client, message, args, data){
    try{

      if(!args[0]){
        let content = `${message.guild.name}'s prefix is:`+ "`" + data.guild.prefix + "`" +`\n\nTo set up a new prefix use ` + "`" + data.guild.prefix + "setprefix [prefix]`"
        return message.channel.send(content)
      }

      if(args[0].length > 5){
        let content = `Unable to assign prefix, make sure the prefix length is less than \`5 characters!\`\n\`\`\`${data.guild.prefix}setprefix [prefix]\`\`\``
        return message.channel.send(content)
      }

      data.guild.prefix = args[0];
      await data.guild.save();

      let content = `Prefix has been successfully updated to ` + "`" + args[0] + "`"
      return message.channel.send(content)

    } catch (err){
      //Log error into the database
      client.logger.error(`Ran into an error while executing ${data.cmd.name}`)
      console.log(err)
    }

  },
};
