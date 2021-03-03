const customisation = require('../../config.json');

module.exports = {
    //Command Information
    name: "bug",
    description: "Sends a bug report about ",
    usage: "bug",
    enabled: true,
    aliases: [],
    category: "General",
    memberPermissions: [],
    botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
    nsfw: false,
    cooldown: 3000,
    ownerOnly: false,
    
    async execute(client, message, args) {
    if (!args[0]) return message.reply("Please specify the bug. Example:\n`!8ball isn't working. It won't tell me it's opinion`");
    if (args[0] === "bug") return message.reply("Please specify the bug. Example:\n`!8ball isn't working. It won't tell my it's opinion.`");
    args = args.join(" ");
    message.reply("Thanks for submitting a bug!");
    const content = `**${message.author.username}#${message.author.discriminator}** reported:\n~~--------------------------------~~\n${args}\n~~--------------------------------~~\nServer ID: **${message.guild.id}**`;
    client.channels.cache.get(customisation.bugchannelid).send(content)
}}
