const fetch = require('node-fetch');
module.exports = {
    name: "github",
    usage: ["Get basic information about a github repo```{prefix}github <username> <repo name>```"],
    enabled: true,
    aliases: [],
    category: "General",
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
        let repo = !args[1] ? "Alita" : args[1];
        
        let github = await fetch(`https://api.github.com/repos/${user}/${repo}`);

        if(github.status === 200){
            let repoJson = await github.json();
            return client.embed.send(message, {
                author: {
                    name: repoJson.owner.login,
                    icon_url: repoJson.owner.avatar_url,
                    url: '',
                },
                description: `${repoJson.description}\n[Repository Link](${repoJson.html_url})`,
                fields: [
                    {
                        name: 'Repo Name :notepad_spiral:',
                        value: repoJson.name,
                        inline: true
                    },
                    {
                        name: 'Stars :star:',
                        value: repoJson.stargazers_count,
                        inline: true,
                    },
                    {
                        name: 'Forks :gear:',
                        value: repoJson.forks,
                        inline: true,
                    },
                    {
                        name: 'Language :desktop:',
                        value: repoJson.language,
                        inline: true,
                    },
                ],
                image: {
                    url: repoJson.owner.avatar_url
                }
            });
        }else{
            return message.channel.send("Unable to find the mentioned github.")
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