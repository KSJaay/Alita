const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Clear extends Command {

    async run (message, args, db) {

              let amount = args[0];
              if(!amount || isNaN(amount) || parseInt(amount) < 1 || parseInt(amount) > 100){
                  return message.channel.send("Please enter a valid amount to clear. it needs to be between 1-100");
              }

              await message.delete();
              message.channel.bulkDelete(amount, true);

              let toDelete = null;

                  toDelete = await message.channel.send(`Cleared ${amount} messages`);

              setTimeout(function(){
                  toDelete.delete();
              }, 4000);


    }


    constructor (client) {
        super(client, {
            name: "clear",
            description: "Clear specific number of messages",
            usage: "Clear {Amount}",
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            nsfw: false,
            aliases: [],
            memberPermissions: [ "MANAGE_MESSAGES" ],
            botPerms: [ "SEND_MESSAGES", "EMBED_LINKS", "MANAGE_MESSAGES" ],
            ownerOnly: false,
            cooldown: 1000
        });
    }



}

module.exports = Clear;
