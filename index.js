const Discord = require("discord.js");
const client = new Discord.Client();

const config = require("./config.json"),
fs = require("fs"),
util = require("util"),
readdir = util.promisify(fs.readdir),
mongoose = require("mongoose");

client.logger = require("./modules/Logger.js");
client.errors = require("./modules/Errors.js");
client.tools = require("./modules/Tools.js");

// Event Handler
client.events = new Discord.Collection();
// Command Handler
client.commands = new Discord.Collection();
// Collection for guildDB
client.guildsData = new Discord.Collection();

async function init(){

const eventFiles = fs.readdirSync('./events/').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    const eventName = file.split(".")[0];
    client.logger.event(`Loading Event - ${eventName}`);
    client.on(eventName, event.bind(null, client));
}

let folders = await readdir("./commands/");
folders.forEach(direct =>{
  const commandFiles = fs.readdirSync('./commands/' + direct + "/").filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
      const command = require(`./commands/${direct}/${file}`);
      client.commands.set(command.name, command);
  }
  })

  // connect to mongoose database
  mongoose.connect(config.mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
      client.logger.log("Connected to the Mongodb database.", "log");
  }).catch((err) => {
      client.logger.log("Unable to connect to the Mongodb database. Error:"+err, "error");
  });


}

init();
client.login(config.token);
