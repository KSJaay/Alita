const { Client, Collection } = require("discord.js"),
util = require("util"),
path = require("path");

class Alita extends Client {

    constructor (options) {
        super(options);
        this.config = require("../config");
        this.commands = new Collection();
        this.aliases = new Collection();
        this.logger = require("../utils/logger");
        this.wait = util.promisify(setTimeout);
        this.functions = require("../utils/functions");
        this.guildsData = require("../base/Guild");
        this.usersData = require("../base/User");
        this.membersData = require("../base/Member");
    }

    loadCommand (commandPath, commandName) {
        try {
            const props = new (require(`.${commandPath}${path.sep}${commandName}`))(this);
            props.conf.location = commandPath;
            if (props.init){
                props.init(this);
            }
            this.commands.set(props.help.name, props);
            props.conf.aliases.forEach((alias) => {
                this.aliases.set(alias, props.help.name);
            });
            return false;
        } catch (e) {
            return `Can't load ${commandName}: ${e}`;
        }
    }

    async unloadCommand (commandPath, commandName) {
        let command;
        if(this.commands.has(commandName)) {
            command = this.commands.get(commandName);
        } else if(this.aliases.has(commandName)){
            command = this.commands.get(this.aliases.get(commandName));
        }
        if(!command){
            return;
        }
        if(command.shutdown){
            await command.shutdown(this);
        }
        delete require.cache[require.resolve(`.${commandPath}${path.sep}${commandName}.js`)];
        return false;
    }

    async findOrCreateUser(param, isLean){
        let usersData = this.usersData;
        return new Promise(async function (resolve, reject){
            let userData = (isLean ? await usersData.findOne(param).lean() : await usersData.findOne(param));
            if(userData){
                resolve(userData);
            } else {
                userData = new usersData(param);
                await userData.save();
                resolve((isLean ? userData.toJSON() : userData));
            }
        });
    }

    async findOrCreateMember(param, isLean){
        let membersData = this.membersData;
        let guildsData = this.guildsData;
        return new Promise(async function (resolve, reject){
            let memberData = (isLean ? await membersData.findOne(param).lean() : await membersData.findOne(param));
            if(memberData){
                resolve(memberData);
            } else {
                memberData = new membersData(param);
                await memberData.save();
                let guild = await guildsData.findOne({ id: param.guildID });
                if(guild){
                    guild.members.push(memberData._id);
                    await guild.save();
                }
                resolve((isLean ? memberData.toJSON() : memberData));
            }
        });
    }

    async findOrCreateGuild(param, isLean){
        let guildsData = this.guildsData;
        return new Promise(async function (resolve, reject){
            let guildData = (isLean ? await guildsData.findOne(param).populate("members").lean() : await guildsData.findOne(param).populate("members"));
            if(guildData){
                resolve(guildData);
            } else {
                guildData = new guildsData(param);
                await guildData.save();
                resolve(guildData.toJSON());
            }
        });
    }


    async resolveUser(search){
        let user = null;
        if(!search || typeof search !== "string") return;
        if(search.match(/^<@!?(\d+)>$/)){
            let id = search.match(/^<@!?(\d+)>$/)[1];
            user = this.users.fetch(id).catch((err) => {});
            if(user) return user;
        }
        if(search.match(/^!?(\w+)#(\d+)$/)){
            let username = search.match(/^!?(\w+)#(\d+)$/)[0];
            let discriminator = search.match(/^!?(\w+)#(\d+)$/)[1];
            user = this.users.find((u) => u.username === username && u.discriminator === discriminator);
            if(user) return user;
        }
        user = await this.users.fetch(search).catch(() => {});
        return user;
    }

    async resolveMember(search, guild){
        let member = null;
        if(!search || typeof search !== "string") return;
        if(search.match(/^<@!?(\d+)>$/)){
            let id = search.match(/^<@!?(\d+)>$/)[1];
            member = await guild.members.fetch(id).catch(() => {});
            if(member) return member;
        }
        if(search.match(/^!?(\w+)#(\d+)$/)){
            guild = await guild.fetch();
            member = guild.members.find((m) => m.user.tag === search);
            if(member) return member;
        }
        member = await guild.members.fetch(search).catch(() => {});
        return member;
    }

    async resolveRole(search, guild){
        let role = null;
        if(!search || typeof search !== "string") return;
        if(search.match(/^<@&!?(\d+)>$/)){
            let id = search.match(/^<@&!?(\d+)>$/)[1];
            role = guild.roles.get(id);
            if(role) return role;
        }
        role = guild.roles.find((r) => search === r.name);
        if(role) return role;
        role = guild.roles.get(search);
        return role;
    }

}

module.exports = Alita;
