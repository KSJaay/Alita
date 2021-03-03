const Discord = require('discord.js');

module.exports = {

  //Information about command
  name: "goodbye",
  description: "When user leaves server send message to channel",
  usage: "goodbye set #channel\ngoodbye custom <text>\ngoodbye disable",
  enabled: true,
  aliases: [],
  category: "Admin",
  memberPermissions: [ "ADMINISTRATOR" ],
  botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
  //Settings for command
  nsfw: false,
  ownerOnly: false,
  cooldown: 5000,

  //Execute to command once the settings have been checked
  async execute(client, message, args, data){
    try{

      let embed = new Discord.MessageEmbed()
      .setFooter(data.config.footer)
      .setColor(data.config.color);

      // If no arguments return error
      if(!args[0]){
        embed.setTitle("Error")
        .setDescription("Missing argument!```goodbye set #channel\ngoodbye custom <text>\ngoodbye disable```")
        return message.channel.send(embed); // Error message
      }

      if(args[0].toLowerCase() === "set" && !args[1]){
        embed.setTitle("Error")
        .setDescription("Unable to find a valid channel.\n\nMissing argument!```goodbye set #channel\ngoodbye custom <text>\ngoodbye disable```")
        return message.channel.send(embed); // Error message
      }

      // Enable welcome messages and set channel to mentioned channel
      if(args[0].toLowerCase() === "set" && args[1]){
        // Try finding the channel
        let goodbyeChannel = await client.tools.resolveChannel(args[1], message.guild);
        if(!goodbyeChannel) return; // Invalid channel

        data.guild.addons.goodbye.enabled = true; // Enable settings
        data.guild.addons.goodbye.channel = goodbyeChannel.id; // Set as channel ID
        data.guild.markModified("addons.goodbye");
        await data.guild.save();

        embed.setTitle("Successfully updated")
        .setDescription(`Goodbye messages will be sent to ${goodbyeChannel}`)

        return message.channel.send(embed)
      }

      if(args[0].toLowerCase() === "custom" && !args[1]){
        embed.setTitle("Error")
        .setDescription("Unable to find a valid channel.\n\nMissing argument!```goodbye set #channel\ngoodbye custom <text>\ngoodbye disable```")
        return message.channel.send(embed); // Error message
      }

      if(args[0].toLowerCase() === "custom" && args[1]){

        if(!data.guild.addons.goodbye.enabled){
          embed.setTitle("Error")
          .setDescription("Please enable goodbye messages before setting up a custom message.\n\nMissing argument!\nVaribles:```{user.ping} - @KSJaay#2487\n{user.name} - KSJaay\n{user.id} - 249955383001481216\n{user.tag} - KSJaay#2487\n{guild.name} - KSJaayDevs\n{guild.id} - 783691402931601441\n{guild.totalUser} - 1```")
          return message.channel.send(embed); // Error message
        }
        await args.shift()
        let msg = args.join(" ")
        if(msg.length > 1500){
          embed.setTitle("Error")
          .setDescription("Messages exceeded 1500 characters, please make sure message is under 1500 characters.")
          return message.channel.send(embed); // Error message
        }

        data.guild.addons.goodbye.message = msg;
        data.guild.markModified("addons.goodbye");
        await data.guild.save();

        embed.setTitle("Successfully updated")
        .setDescription("Custom message has been updated.\n\n**New Message**\n```" + msg + "```")
        return message.channel.send(embed); // Error message
      }

      if(args[0].toLowerCase() === "disable"){
        if(!data.guild.addons.goodbye.enabled){
          embed.setTitle("Successfully updated")
          .setDescription("Goodbye messages were already disabled.")
          return message.channel.send(embed); // Error message
        }

        data.guild.addons.goodbye.enabled = false;
        data.guild.addons.goodbye.channel = "";
        data.guild.markModified("addons.goodbye");
        await data.guild.save();

        embed.setTitle("Successfully updated")
        .setDescription("Goodbye messages have now been disabled.")
        return message.channel.send(embed); // Error message
      }

      embed.setTitle("Error")
      .setDescription("Missing argument!```goodbye set #channel\ngoodbye custom <text>\ngoodbye disable```")
      return message.channel.send(embed); // Error message

    } catch (err){
      //Log error into the database
      client.logger.error(`Ran into an error while executing ${data.cmd.name}`)
      console.log(err)
    }

  },
};
