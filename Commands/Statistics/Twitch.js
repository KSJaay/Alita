var api = require("twitch-api-v5");
const _ = require('lodash')
var moment = require("moment")

//read the docs how to get the Twitch-CliendID: https://dev.twitch.tv/docs/v5
api.clientID = "";

module.exports = {
    name: "twitch",
    usage: ["Checks the Twitch Profile also ```{prefix}ttv <twitch userr>```"],
    enabled: true,
    aliases: ["ttv"],
    category: "General",
    memberPermissions: [],
    botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
    //Settings for command
    nsfw: false,
    ownerOnly: false,
    cooldown: 5000,

    // Execute contains content for the command
    async execute(client, message, args, data){
      api.search.channels({ query: `${args[0]}`}, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        let final = _.first(res.channels)
        console.log(final)

        let broadcasterType = final.broadcaster_type
        if (broadcasterType === '') {
          broadcasterType = "None"
        } else if (broadcasterType === 'affiliate') {
          broadcasterType = "Affiliate"
        } else if (broadcasterType === 'partner') {
          broadcasterType = "Partner"
        } 

        let created = moment(final.created_at).format('DD-MM-YYYY')
        let lastLive = moment(final.updated_at).format('DD-MM-YYYY, HH:mm')

        const twitchEmbed = new MessageEmbed()
            .setColor("#6441a5")
            .setAuthor(`   │   ${final.display_name}`, client.user.displayAvatarURL())
            .setDescription(`${final.description}`)
            .addField('Latest Stream:', `${final.status}\fGame: \`${final.game}\``)
            .addField('Followers', final.followers.toLocaleString(), true)
            .addField('Views', final.views.toLocaleString(), true)
            .addField('Broadcaster Type', broadcasterType)
            .addField("Created On", created, true)
            .addField("Last Live", lastLive, true)
            .setThumbnail(final.logo)
            .setFooter(`Their URL: ${final.url}`)

            return message.channel.send(twitchEmbed)
      }
    });
  }
};