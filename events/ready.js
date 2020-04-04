const { prefix } = require("../config.json");

const chalk = require("chalk");

module.exports = (client) => {
    try {
        client.logger.ready(`${client.user.tag} is now up and running!`);
    } catch (e) {
        console.log(e);
    }
};
