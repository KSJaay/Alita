module.exports.getUser = async function(search, client){
  //Finds the user
  let user = null;
  if(!search || typeof search !== "string") return;
  if(search.match(/^<@!?(\d+)>$/)){
      let id = search.match(/^<@!?(\d+)>$/)[1];
      user = client.users.fetch(id).catch((err) => {});
      if(user) return user;
  }
  if(search.match(/^!?(\w+)#(\d+)$/)){
      let username = search.match(/^!?(\w+)#(\d+)$/)[0];
      let discriminator = search.match(/^!?(\w+)#(\d+)$/)[1];
      user = client.users.find((u) => u.username === username && u.discriminator === discriminator);
      if(user) return user;
  }
  user = await client.users.fetch(search).catch(() => {});
  return user;

}

module.exports.getMember = async function(search, guild){
  //Finds a member from the current server
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

// module.exports.getRole = async function(search, guild){
//
// }


// module.exports.getChannel = async function(search, guild){
//
//   let channel = null;
//   if(!search || typeof search !== "string") return;
//   // Really need an ID??
//   if(search.match(/^#&!?(\d+)$/)){
//       let id = search.match(/^#&!?(\d+)$/)[1];
//       channel = guild.channels.cache.get(id);
//       if(channel) return channel;
//   }
//   if(search.includes("<#")){
//     let firstChannel = search.replace("<#", "");
//     let channelID = firstChannel.replace(">", "");
//     let channel = guild.channels.cache.get(channelID);
//     if(channel) return channel;
//   }
//   // or is it a name maybe??
//   channel = guild.channels.cache.find((c) => search === c.name);
//   if(channel) return channel;
//   channel = guild.channels.cache.get(search);
//   return channel;
//
// }
