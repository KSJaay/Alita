const fs = require("fs");
const path = require("path");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

const config = require("../config.json");

const init = async () => {
  const interactionsFolderPath = path.join(
    process.cwd(),
    "/constants/interactions"
  );

  const commands = [];

  const commandFiles = fs
    .readdirSync(interactionsFolderPath)
    .filter((file) => file.endsWith(".json"));

  for (const file of commandFiles) {
    try {
      const filePath = path.join(interactionsFolderPath, file);
      const command = JSON.parse(fs.readFileSync(filePath, "utf-8"));

      if (!command || JSON.stringify(command) === "{}") {
        console.log("INTERACTIONS", {
          message: `No interactions found in ${file}`,
        });
        continue;
      }

      commands.push(command);
    } catch (error) {
      console.log("INTERACTIONS", {
        message: error?.message,
        stack: error?.stack,
        file,
      });
    }
  }

  const clientId = config.CLIENT_ID;
  const discordToken = config.DISCORD_TOKEN;

  if (!discordToken) {
    console.log("INTERACTIONS", {
      message: "DISCORD_TOKEN is not set in .env file",
    });
    return;
  }

  const rest = new REST({ version: "9" }).setToken(discordToken);

  try {
    if (!clientId) {
      console.log("INTERACTIONS", {
        message: "CLIENT_ID is not set in .env file",
      });
      return;
    }

    if (config.NODE_ENV === "development") {
      if (!config.SLASH_COMMAND_GUILD_ID_DEV) {
        console.log("INTERACTIONS", {
          message: "SLASH_COMMAND_GUILD_ID_DEV is not set in .env file",
        });
        return;
      }

      await rest
        .put(
          Routes.applicationGuildCommands(
            clientId,
            config.SLASH_COMMAND_GUILD_ID_DEV
          ),
          {
            body: commands,
          }
        )
        .then((res) => console.log(res))
        .catch((err) => console.log(err));

      console.log("INTERACTIONS", {
        message: "Interactions successfully registered for development",
      });
    }

    if (config.NODE_ENV === "production") {
      await rest
        .put(Routes.applicationCommands(clientId), {
          body: commands,
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));

      console.log("INTERACTIONS", {
        message: "Interactions successfully registered for production",
      });
    }
  } catch (error) {
    console.error(error);
  }
};

init();
