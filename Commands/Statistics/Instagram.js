const fetch = require("node-fetch");

module.exports = {
    name: "instagram",
    usage: ["Get the most popular post from an instagram account```{prefix}instagram <user>```"],
    enabled: true,
    aliases: ["insta"],
    category: "Stats",
    memberPermissions: [],
    botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
    //Settings for command
    nsfw: false,
    ownerOnly: false,
    cooldown: 5000,

    // Execute contains content for the command
    async execute(client, message, args, data){
        try{
            let user = !args[0] ? "KSJaay" : args[0];
            let instagram = await fetchInstagram(user);

            if(!instagram){
                return message.channel.send("Unable to find the provided channel.");
            }   

            // Get the top liked image
            let topImage;
            if(instagram.imageData.length > 0){
                topImage = instagram.imageData[0];
            }else{
                topImage = {
                likes: 0,
                comments: 0,
                image: message.client.user.displayAvatarURL()
                }
            }

            return client.embed.send(message, {
                title: instagram.name,
                url: `https://www.instagram.com/${instagram.id}`,
                thumbnail: {
                    url: instagram.image
                },
                description: instagram.bio,
                fields: [
                    {
                        name: 'Followers',
                        value: instagram.followers,
                        inline: true,
                    },
                    {
                        name: 'Following',
                        value: instagram.following,
                        inline: true,
                    },
                ],
                image: {
                    url: topImage.image
                },
                footer: {
                    text: `👍 ${topImage.likes} 💬 ${topImage.comments}`,
                    icon_url: '',
                }
            })



            async function fetchInstagram(id){
                let url = `https://www.instagram.com/${id}/?__a=1`;
                // Get profile information using url
                let results = await fetch(url)

                // If there's no results return false
                if(results.status !== 200){
                    return false;
                }

                results = await results.json();

                // Get information about the user
                let data = {
                    id: results.graphql.user.username,
                    name: results.graphql.user.full_name,
                    bio: results.graphql.user.biography,
                    followers: results.graphql.user.edge_followed_by.count,
                    following: results.graphql.user.edge_follow.count,
                    image: results.graphql.user.profile_pic_url_hd
                }

                // Get information about each image
                let images = results.graphql.user.edge_owner_to_timeline_media;
                let imgArr = [];
                for(let i=0; i < images.edges.length; i++){
                    let imageData = {
                    image: images.edges[i].node.display_url,
                    likes: images.edges[i].node.edge_liked_by.count,
                    comments: images.edges[i].node.edge_media_to_comment.count
                    }
                    imgArr.push(imageData)
                }

                // Sort likes from most to least
                await imgArr.sort(function(a, b){return a.likes - b.likes});

                data.imageData = imgArr;

                return data;
            }

        }catch(err){
            client.logger.error(`Ran into an error while executing ${data.cmd.name}`)
            console.log(err)
            return client.embed.send(message, {
                description: `An issue has occured while running the command. If this error keeps occuring please contact our development team.`,
                color: `RED`,
                author: {
                    name: `Uh Oh!`,
                    icon_url: `${message.author.displayAvatarURL()}`,
                    url: "",
                }
            });
        }
    }
}