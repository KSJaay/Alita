// Importing modules
const Discord = require('discord.js'),
fs = require('fs'),
mongoose = require('mongoose'),
util = require('util'),
config = require('./config.json'),
readdir = util.promisify(fs.readdir),
client = new Discord.Client({ intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_VOICE_STATES', 'GUILD_MESSAGES', 'DIRECT_MESSAGES']});

// Adding to the client
client.event = new Discord.Collection();
client.commands = new Discord.Collection();
client.config = config;
client.Database = require('./Database/Mongoose.js');
client.tools = require('./Tools/Tools.js');
client.logger = require('./Tools/Logger.js');
client.embed = require('./Tools/Embed.js');

async function init(){
    // Load Discordjs Events
    const eventFiles = fs.readdirSync('./Events/').filter(file => file.endsWith('.js'));
    for (const file of eventFiles) {
    const event = require(`./Events/${file}`);
    const eventName = file.split(".")[0];
    console.log(`Loading... ${eventName}`)
    client.on(eventName, event.bind(null, client));
    }

    //Load the commands
    let folders = await readdir("./Commands/");
    folders.forEach(direct =>{
    const commandFiles = fs.readdirSync('./Commands/' + direct + "/").filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./Commands/${direct}/${file}`);
        client.commands.set(command.name, command);
    }
    })

    // Connect to the database
    mongoose.connect(config.mongoDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('Connected to MongoDB')
    }).catch((err) => {
        console.log('Unable to connect to MongoDB Database.\nError: ' + err)
    })

    await client.login(config.token)
}

init();

process.on('unhandledRejection', err =>{
    console.log('Unknown error occured:\n')
    console.log(err)
})