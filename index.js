const fs = require("fs");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Discord = require("discord.js");
const logger = require("./logger");

dotenv.config();
const client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildBans,
    Discord.GatewayIntentBits.GuildInvites,
    Discord.GatewayIntentBits.GuildMembers,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.GuildPresences,
  ],
});

async function init() {
  client.commands = new Discord.Collection();
  client.events = new Discord.Collection();

  // Connect to MongoDB
  await mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      logger.info("Connected to MongoDB");
    })
    .catch((err) => {
      logger.error("Error connecting to MongoDB", {
        error: err.message || null,
        stack: err.stack || null,
      });

      process.exit(1);
    });

  // Load commands and events
  const commandFolders = fs.readdirSync(__dirname + "/commands");

  for (const folder of commandFolders) {
    const commandFiles = fs
      .readdirSync(__dirname + `/commands/${folder}`)
      .filter((file) => file.endsWith(".js"));
    for (const file of commandFiles) {
      const command = require(__dirname + `/commands/${folder}/${file}`);
      client.commands.set(command.name, command);
      logger.info(`Loaded command ${command.name}`);
    }
  }

  const eventFiles = fs
    .readdirSync(__dirname + "/events")
    .filter((file) => file.endsWith(".js"));

  for (const file of eventFiles) {
    const event = require(__dirname + `/events/${file}`);
    const eventName = file.split(".")[0];
    client.events.set(eventName, event);
    client.on(eventName, event.bind(null, client));
    logger.info(`Loaded event ${eventName}`);
  }

  client.login(process.env.DISCORD_TOKEN);
}

// Graceful shutdown. Close the database connection before exiting
process.on("SIGTERM", async () => {
  logger.info("SIGTERM signal received, shutting down gracefully");
  await mongoose.disconnect();
  process.exit(0);
});

// Catch any uncaught exceptions or unhandled rejections
process.on("uncaughtException", (error) => {
  logger.error("uncaughtException", {
    error: error.message || null,
  });
});

process.on("unhandledRejection", (error) => {
  logger.warn("unhandledRejection:\n", {
    error: error?.message || null,
    stack: error?.stack || null,
  });
});

// Start the bot
init();
