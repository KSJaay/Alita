const Discord = require("discord.js");
const { prefix, ownerID } = require("../config.json");
const { Error } = require("../modules/Errors");

module.exports = (client, message) => {
    // EMBED
    const embed = new Discord.MessageEmbed()
        .setColor("GREEN");

    // CHECKS
    if (message.author.bot) return;
    if (message.content.indexOf(prefix) !== 0) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);

    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

    if (command.guildOnly) {
        if (message.channel.type === "dm") return Error();
    }


    try {
        command.execute(client, message, args);
        client.logger.cmd(`${message.author.tag} used ${commandName}`);
    }
    catch (e) {
        console.error(e);
        client.errors.cmdError(message);
    }
};
