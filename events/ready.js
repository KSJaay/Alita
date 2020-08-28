const fetchArticles = require("./../Modules/API/News/Fetch.js"),
checkArticles = require("./../Modules/API/News/Check.js"),
languages = require('./../Modules/LoadLanguage.js');

module.exports = async(client) => {
try {

  client.user.setPresence({ activity: { name: 'for v!help', type: "WATCHING" }, status: "online" });
  client.logger.ready(`${client.user.tag} is now up and running!`);
  await languages(client)
  // await checkArticles(client)
  // if(client.shard.ids[0] === 0){
  //
  //   fetchArticles(client)
  //
  // }

} catch (e) {
    console.log(e);
}

};
