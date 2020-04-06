const Discord = require("discord.js");

module.exports = {
    //Command Information
    name: "ping",
    description: "Get the currently latency of the bot",
    usage: "ping",
    category: "General",
    enabled: true,
    guildOnly: true,
    aliases: [],
    memberPermissions: [],
    botPermissions: ["SEND_MESSAGES",
    nsfw: false,
    cooldown: 5000,
    ownerOnly: false,

    async execute(client, message, args) {

      message.channel.send(`Pinging....`).then((m) => {
        let latencyPing =Math.floor( m.createdTimestamp - message.createdTimestamp)
          m.delete()
          message.channel.send(`Latency: `+"``"+ `${latencyPing}`+"``"+ "ms\nThis really means nothing tbh");
        });


    },
};
