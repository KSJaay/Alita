const {successEmbed} = require("../../utils/embeds");
const logger = require("../../logger");

function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
}

module.exports = {
  name: "botstats",
  category: "📋 General",
  permissions: {
    admin: true,
  },
  database: {
    guild: true,
    user: true,
    member: true,
  },

  async execute(client, interaction, data = {}) {
    try {
      const uptime = msToTime(client.uptime);
      const ram = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);

      return interaction.reply({
        embeds: [
          successEmbed({
            title: "Bot Stats",
            fields: [
              {
                name: "Uptime",
                value: "```" + uptime + "```",
              },
              {
                name: "RAM Usage",
                value: "```" + `${ram} MB` + "```",
              },
              {
                name: "Guilds",
                value: "```" + client.guilds.cache.size + "```",
              },
              {
                name: "Users",
                value: "```" + client.users.cache.size + "```",
              },
              {
                name: "Channels",
                value: "```" + client.channels.cache.size + "```",
              },
            ],
          }),
        ],
      });
    } catch (error) {
      logger.error(`Error executing '${this.name}' command!`, {
        label: "Command",
        message: error.message,

        data,
      });
    }
  },

  interaction: {
    name: "botstats",
    description: "Check the bot's stats",
    options: [],
  },
};
