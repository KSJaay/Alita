// Upload all the interactions to discord

const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

const {REST} = require("@discordjs/rest");
const {Routes} = require("discord-api-types/v9");

dotenv.config();

const commands = [];
const commandPath = path.join(__dirname, "..", "/commands");
const commandFolders = fs.readdirSync(commandPath);

for (const folder of commandFolders) {
  const commandFiles = fs
    .readdirSync(commandPath + `/${folder}`)
    .filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    const command = require(commandPath + `/${folder}/${file}`);
    commands.push(command.interaction);
  }
}

const rest = new REST({version: "9"}).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    await rest.put(Routes.applicationCommands(process.env.DISCORD_CLIENT_ID), {
      body: commands,
    });

    console.log("Successfully registered application commands.");
  } catch (error) {
    console.error(error);
  }
})();
