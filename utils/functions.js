const Discord = require("discord.js");

module.exports = {

    async getUsersData(client, users){
        return new Promise(async function(resolve, reject){
            let usersData = [];
            for(let u of users){
                let result = await client.usersData.find({id: u.id});
                if(result[0]){
                    usersData.push(result[0]);
                } else {
                    let user = new client.usersData({
                        id: u.id
                    });
                    await user.save();
                    usersData.push(user);
                }
            }
            resolve(usersData);
        });
    },

    getPrefix(message, data){
    if(message.channel.type !== "dm"){
        const prefixes = [
            `<@${message.client.user.id}>`,
            data.guild.prefix
        ];
        let prefix = null;
        prefixes.forEach((p) => {
            if(message.content.startsWith(p)){
                prefix = p;
            }
        });
        return prefix;
    } else {
        return true;
    }
},

};
