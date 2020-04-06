const Discord = require("discord.js");
const util = require("util"),
fs = require("fs"),
readdir = util.promisify(fs.readdir);
module.exports.MapCats = async function(client){

  const embed = new Discord.MessageEmbed()
      .setColor("BLUE");
      embed.setAuthor("Help command!", client.user.displayAvatarURL);

    let folders = await readdir("./commands/");
    folders.forEach(cat => {
    let commandFiles = fs.readdirSync('./commands/' + cat + "/").filter(file => file.endsWith('.js'))
      if(commandFiles.length > 0){
        let files = commandFiles.map(cmd => "`" + cmd.replace(".js", "") + "`").join(", ");
        embed.addField(cat, files)
      }
    });
    embed.setFooter(`You can do -ahelp [command] to see aditional info!`);
      return embed;

};
