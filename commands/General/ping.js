const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Ping extends Command {

    async run (message, args, db) {

      // Send a message
      message.channel.send(`Pinging....`).then((m) => {
        let latencyPing =Math.floor( m.createdTimestamp - message.createdTimestamp)
          m.delete()
          message.channel.send(`Latency: `+"``"+ `${latencyPing}`+"``"+ "ms\nThis really means nothing tbh");
        });

    }

    constructor (client) {
        super(client, {
            name: "ping",
            description: "Ping to bot to see Latency",
            usage: "ping",
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            nsfw: false,
            aliases: [],
            memberPermissions: [],
            botPerms: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            ownerOnly: false,
            cooldown: 1000
        });
    }


}

module.exports = Ping;
