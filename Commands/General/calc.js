const math = require('discord-math');

module.exports = {
    name: "calc",
    usage: ["Math things```{prefix}calc <Math operationr>```"],
    enabled: true,
    aliases: [],
    category: "General",
    memberPermissions: [],
    botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
    //Settings for command
    nsfw: false,
    ownerOnly: false,
    cooldown: 5000,

    // Execute contains content for the command
    async execute(client, message, args, data){
        try {
            let num1 = args[0];
            let operation = args [1];
            let num2 = args[2];
            
            if (!num1) return message.channel.send('Num1 needs to be specified!');
            if (!operation) return message.channel.send('An operation was not specified!');
            if (!num2) return message.channel.send('Num2 needs to be specified!');
 
            message.channel.send(`Answer: ${math.calculate(num1, operation, num2)}`);
        } catch (e) {
            console.log(e);
        }
}
