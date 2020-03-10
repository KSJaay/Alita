const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Help extends Command {

    async run (message, args, data) {

        const categories = [];
        const commands = message.client.commands;

        commands.forEach((command) => {
            if(!categories.includes(command.help.category)){
                categories.push(command.help.category);
            }
        });

        let embed = new Discord.MessageEmbed()
            .setDescription("This is a list of commands Alita currently offers. For more information about a command do `-help [command name]`")
            .setColor(data.config.embed.color)
            .setFooter(data.config.embed.footer);

        categories.sort().forEach((folder) => {
              let asCmds = commands.filter((cmd) => cmd.help.category === folder);
              embed.addFields({ name: folder, value: asCmds.map((cmd) => cmd.help.name).join(", ")});
        });



        embed.setAuthor("Alita's commands", message.client.user.displayAvatarURL());
        return message.channel.send(embed);

    }
    constructor (client) {
        super(client, {
            name: "help",
            description: "Shows all the commands Alita offers",
            usage: "help",
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            aliases: ["help"],
            memberPermissions: [],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            cooldown: 3000,
            ownerOnly: false
        });
    }
}

module.exports = Help;
