const data = require("./MongoDB.js");

//Gets the users DB (Will be adding to collection in the future)
module.exports.getUserDB = async function(userID){

let userDB = data.createUserDB(userID);
return userDB;

}
//Add to collection else get from DB & add to collection
module.exports.getGuildDB = async function(client, guildID){

  let guildDB = await client.guildsData.find(u => u.id === guildID);

  if(guildDB){
    return guildDB
  }else{
    let guildDB = await data.createGuildDB(guildID);
    await client.guildsData.set(guildID, guildDB);
    return guildDB;
  }

}

// //Gets the users DB (Will be adding to collection in the future)
// module.exports.updateUserDB = async function(userID){
//
// let userDB = data.createUserDB(userID);
// return userDB;
//
// }
//Add to collection else get from DB & add to collection
module.exports.updateGuildDB = async function(client, guildID){

  let newData = await db.createGuildDB(message.guild.id);
  return await client.guildsData.set(message.guild.id, newData);

}
