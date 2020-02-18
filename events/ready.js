const Discord = require("discord.js");

module.exports = class {

    constructor (client) {
        this.client = client;
    }

    async run () {

        let client = this.client;

        client.logger.log(`Loading ${client.commands.size} commands.`, "log");
        client.logger.log(`Autobots roll out.`, "ready");


            client.user.setActivity("For -aHelp", {type: "WATCHING"});

    }
}
