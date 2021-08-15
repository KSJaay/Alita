module.exports = {
    name: "8ball",
    usage: ["Let the 8ball answer your question```{prefix}8ball <question>```"],
    enabled: true,
    aliases: ["eightball"],
    category: "Fun",
    memberPermissions: [],
    botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
    //Settings for command
    nsfw: false,
    ownerOnly: false,
    cooldown: 5000,

    // Execute contains content for the command
    async execute(client, message, args, data){
        try{
            if(!args[0]) return message.reply({content: "Please ask a question", allowedMentions: {repliedUser: false}});

            let replies = [
                'Maybe.',
                'Certainly not.',
                'I hope so.',
                'Not in your wildest dreams.',
                'There is a good chance.',
                'Quite likely.',
                'I think so.',
                'I hope not.',
                'I hope so.',
                'Never!',
                'Pfft.',
                'Sorry, bucko.',
                'Hell, yes.',
                'Hell to the no.',
                'The future is bleak.',
                'The future is uncertain.',
                'I would rather not say.',
                'Who cares?',
                'Possibly.',
                'Never, ever, ever.',
                'There is a small chance.',
                'Yes!',
                'lol no.',
                'There is a high probability.',
                'What difference does it makes?',
                'Not my problem.',
                'Ask someone else.'
            ];

            let result = replies[Math.floor((Math.random() * replies.length))];
            let question = args.slice(0).join(" ");

            return client.embed.send(message, {
                title: "MAGIC 8 BALL!",
                color: '#AA9900',
                fields: [
                    {
                        name: 'Question:',
                        value: question,
                    },
                    {
                        name: 'Answer:',
                        value: result,
                    },
                ],
                footer: {
                    text: ''
                }
            });

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