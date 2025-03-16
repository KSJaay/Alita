// import node_modules
const fs = require("fs");
const mongoose = require("mongoose");
const Discord = require("discord.js");

const config = require("./config.json");
const logger = require("./logger");

async function init() {
  const client = new Discord.Client({
    intents: ["Guilds", "GuildMembers", "GuildMessages", "GuildMembers"],
    presence: { activities: [{ name: "for /help", type: 3 }] },
  });

  await mongoose
    .connect(config.MONGO_URI)
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

  client.buttons = new Discord.Collection();
  client.commands = new Discord.Collection();
  client.games = new Discord.Collection();
  client.interaction_flags = config.INTERACTION_FLAGS;

  const commandFolders = fs.readdirSync(__dirname + "/commands");

  commandFolders.forEach((directory) => {
    const commandFiles = fs
      .readdirSync(__dirname + `/commands/${directory}`)
      .filter((file) => file.endsWith(".js"));

    for (const file of commandFiles) {
      const command = require(`./commands/${directory}/${file}`);
      client.commands.set(command.name, command);
    }
  });

  const buttonsFolders = fs.readdirSync(__dirname + "/buttons");

  buttonsFolders.forEach((directory) => {
    const commandFiles = fs
      .readdirSync(__dirname + `/buttons/${directory}`)
      .filter((file) => file.endsWith(".js"));

    for (const file of commandFiles) {
      const command = require(`./buttons/${directory}/${file}`);
      client.buttons.set(command.name, command);
    }
  });

  const eventFiles = fs
    .readdirSync(__dirname + "/events")
    .filter((file) => file.endsWith(".js"));

  for (const eventFile of eventFiles) {
    const event = require(`./events/${eventFile}`);
    const eventName = eventFile.split(".")[0];
    client.on(eventName, event.bind(null, client));
  }

  process.on("uncaughtException", (error) => {
    if (error.message === "Missing Permissions") {
      return;
    }

    // Log message
    logger.error("uncaughtException", {
      error: error.message || null,
      stack: error.stack || null,
    });
  });

  process.on("unhandledRejection", (error) => {
    logger.error("unhandledRejection", {
      error: error?.message || null,
      stack: error?.stack || null,
    });
  });

  process.on("SIGTERM", async function () {
    logger.error("SIGTERM", { message: "Terminating bot" });
    process.exit(0);
  });

  client.login(config.DISCORD_TOKEN);
}

init();
