// module.exports.getUser = async function(search, client){
//
// }

// module.exports.getMember = async function(search, guild){
//
// }
//
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
