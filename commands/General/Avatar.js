const Discord = require("discord.js");

module.exports = {
    //Command Information
    name: "avatar",
    description: "Get the link for the users Avatar",
    usage: "Avatar @user",
    enabled: true,
    aliases: ["stats"],
    category: "General",
    memberPermissions: [],
    botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
    nsfw: false,
    cooldown: 3000,
    ownerOnly: false,

    async execute(client, message, args, data) {

        let user = !args[0] ? message.author : await findMember(args[0], message.guild)
        let embed = new Discord.MessageEmbed()
        .setTitle(`Avatar for ${user.tag}`)
        .addField("Links as", `[png](${user.displayAvatarURL()}.png?size=1024]) | [jpg](${user.displayAvatarURL()}.jpg?size=1024) | [webp](${user.displayAvatarURL()}.webp?size=1024)`)
        .setImage(`${user.displayAvatarURL()}?size=1024`)
        .setColor(data.config.color)
        .setFooter(data.config.footer)
        return message.channel.send(embed)



        async function findMember(query, guild){
          let member = null;
          if(!query || typeof query !== "string") return;
          // Try to search using ID
          if(query.match(/^<@!?(\d+)>$/)){
            const id = query.match(/^<@!?(\d+)>$/)[1];
            member = await guild.members.cache.get(id);
            if(member) return member.user;
          }
          // Try to search using discrim
          if(query.match(/^!?(\w+)#(\d+)$/)){
            guild = await guild.fetch();
            member = guild.members.cache.find((m) => m.user.tag === query);
            if(member) return member.user;
          }
          // Try to find the user itself
          member = await guild.members.cache.get(query);
          return member.user;
        }


    },
};
