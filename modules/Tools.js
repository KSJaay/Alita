const Discord = require("discord.js");

module.exports.resolveMember = async function(query, guild){
  let member = null;
  if(!query || typeof query !== "string") return;
  // Try to search using ID
  if(query.match(/^<@!?(\d+)>$/)){
    const id = query.match(/^<@!?(\d+)>$/)[1];
    member = await guild.members.cache.get(id);
    if(member) return member;
  }
  // Try to search using discrim
  if(query.match(/^!?(\w+)#(\d+)$/)){
    guild = await guild.fetch();
    member = guild.members.cache.find((m) => m.user.tag === query);
    if(member) return member;
  }
  // Try to find the user itself
  member = await guild.members.cache.get(query);
  return member;

};


module.exports.fetchCmdList = async function(client, message, data){
  let category = await client.commands.map(x => x.category);
  let embed = new Discord.MessageEmbed()
  .setAuthor("Alita Help List", client.user.displayAvatarURL())
  .setColor(data.config.color)
  .setFooter(data.config.footer);

  let catList = []
  for(let i=0; i < category.length; i++){
    if(!catList.includes(category[i])){
      catList.push(category[i])
      let cmdList = await client.commands.filter(x => x.category === category[i]).map(x => x.name).join(", ")
      embed.addField(category[i], "```" + cmdList + "```")
    }
  }

  return message.channel.send(embed)

};
