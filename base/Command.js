const path = require("path");

module.exports = class Command {
    constructor(client, {
      name = null,
      description = "No description provided",
      usage = "No usage provided",
      dirname = false,
      enabled = true,
      guildOnly = false,
      aliases = new Array(),
      botPerms = new Array(),
      memberPermissions = new Array(),
      nsfw = false,
      ownerOnly = false,
      cooldown = 5000
    })
    {
      let category = (dirname ? dirname.split(path.sep)[parseInt(dirname.split(path.sep).length-1, 10)] : "Other");
      this.client = client;
      this.conf = { enabled, guildOnly, aliases, memberPermissions, botPerms, nsfw, ownerOnly, cooldown};
      this.help = { name, description, category, usage };
    }
  };
