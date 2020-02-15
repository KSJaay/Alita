const Discord = require("discord.js"),
cmdCooldown = {};

module.exports = class {
    constructor (client) {
        this.client = client;
    }

    async run (message) {

        const db = {};

        if(message.author.bot){
            return;
        }

        if(message.guild && !message.member){
            await message.guild.members.fetch(message.author.id);
        }

        let client = this.client;
        db.config = client.config;

        if(message.guild){
            let guild = await client.findOrCreateGuild({ id: message.guild.id });
            db.guild = guild;
        }

        if(message.guild){
            let memberData = await client.findOrCreateMember({ id: message.author.id, guildID: message.guild.id });
            db.memberData = memberData;
        }

        let userData = await client.findOrCreateUser({ id: message.author.id });
        db.userData = userData;

        let prefix = client.functions.getPrefix(message, db);
        if(!prefix){
            return;
        }

        let args = message.content.slice((typeof prefix === "string" ? prefix.length : 0)).trim().split(/ +/g);
        let command = args.shift().toLowerCase();
        let cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));

        if(!cmd){
            return;
        }

        if(cmd.conf.guildOnly && !message.guild){
            return message.channel.send("You need to be in a server to use this command");
        }

        if(!cmd.conf.enabled){
            return message.channel.send("Command is currently disabled!");
        }

        if(cmd.conf.ownerOnly && message.author.id !== client.config.owner.id){
            return message.channel.send("Only KSJaay can use this command dude");
        }

        if(message.guild){

            let neededPermission = [];

            if(!cmd.conf.botPerms.includes("EMBED_LINKS")){
                cmd.conf.botPerms.push("EMBED_LINKS");
            }

            if(!cmd.conf.botPerms.includes("SEND_MESSAGES")){
                cmd.conf.botPerms.push("SEND_MESSAGES");
            }

            cmd.conf.botPerms.forEach((perm) => {
                if(!message.channel.permissionsFor(message.guild.me).has(perm)){
                    neededPermission.push(perm);
                }
            });
            if(neededPermission.length > 0){
                return message.channel.send("I dont have the correct permissions to use this command. Permissions needed:" + neededPermission.map((p) => `\`${p}\``).join("\n "));
            }
            neededPermission = [];
            cmd.conf.memberPermissions.forEach((perm) => {
                if(!message.channel.permissionsFor(message.member).has(perm)){
                    neededPermission.push(perm);
                }
            });
            if(neededPermission.length > 0){
                return message.channel.send("You dont have the correct permissions to use this command. Permissions needed:" + neededPermission.map((p) => `\`${p}\``).join("\n "));
            }

            if(cmd.conf.permission){
                if(!message.member.hasPermission(cmd.conf.permission)){
                    return message.channel.send("You're lacking some permissions my guy!");
                }
            }

            if(!message.channel.permissionsFor(message.member).has("MENTION_EVERYONE") && (message.content.includes("@everyone") || message.content.includes("@here"))){
                return message.channel.send("Why you trying to mention everyone??");
            }
        }

        let userCooldown = cmdCooldown[message.author.id];
        if(!userCooldown){
            cmdCooldown[message.author.id] = {};
            userCooldown = cmdCooldown[message.author.id];
        }
        let time = userCooldown[cmd.help.name] || 0;

        if(time && (time > Date.now())){
            return message.channel.send(`Command currently on cooldown. You need to wait ` + Math.ceil((time-Date.now())/1000) + " seconds before you can use that command again");
        }
        cmdCooldown[message.author.id][cmd.help.name] = Date.now() + cmd.conf.cooldown;

        client.logger.log(`${message.author.username} (${message.author.id}) ran command ${cmd.help.name}`, "cmd");

        try {
            cmd.run(message, args, db);

          } catch(e){
            console.error(e);
            return message.channel.send("Ooof another error dude");
        }
    }
};
