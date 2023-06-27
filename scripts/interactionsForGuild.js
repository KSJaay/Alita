// Upload all the interactions to discord

const fs = require("fs");

const {REST} = require("@discordjs/rest");
const {Routes} = require("discord-api-types/v9");

const commands = [];
const commandFolders = fs.readdirSync(__dirname + "/commands");

for (const folder of commandFolders) {
  const commandFiles = fs
    .readdirSync(__dirname + `/commands/${folder}`)
    .filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    const command = require(__dirname + `/commands/${folder}/${file}`);
    commands.push(command.interaction);
  }
}

const rest = new REST({version: "9"}).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    await rest.put(
      Routes.applicationGuildCommands(
        process.env.DISCORD_CLIENT_ID,
        process.env.GUILD_ID
      ),
      {body: commands}
    );

    console.log("Successfully registered application commands.");
  } catch (error) {
    console.error(error);
  }
})();
