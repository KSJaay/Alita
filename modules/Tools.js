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

module.exports.resolveChannel = async function(search, guild){
  let channel = null;
  if(!search || typeof search !== "string") return;
  //Try to search using ID
  if(search.match(/^#&!?(\d+)$/)){
      let id = search.match(/^#&!?(\d+)$/)[1];
      channel = guild.channels.cache.get(id);
      if(channel) return channel;
  }
  //Got fucking lazy so I just removed the <#>
  if(search.includes("<#")){
    let firstChannel = search.replace("<#", "");
    let channelID = firstChannel.replace(">", "");
    let channel = guild.channels.cache.get(channelID);
    if(channel) return channel;
  }
  //Try to search it using name
  channel = guild.channels.cache.find((c) => search.toLowerCase() === c.name.toLowerCase());
  if(channel) return channel;
  //Try to find the channel itself
  channel = guild.channels.cache.get(search);
  return channel;
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
