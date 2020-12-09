const Discord = require("discord.js");
const helper = require("./../../helpers/Stats/Youtube.js");

const { CanvasRenderService } = require('chartjs-node-canvas');

const width = 1300;
const height = 375;
const chartCallback = (ChartJS) => {

    ChartJS.defaults.global.elements.rectangle.borderWidth = 2;

    ChartJS.plugins.register({});
    ChartJS.controllers.MyType = ChartJS.DatasetController.extend({});
};
const canvasRenderService = new CanvasRenderService(width, height, chartCallback);
// White color and bold font
const ticksOptions = [{ ticks: { fontColor: "white", fontStyle: "bold", fontSize: "12" } }];
const options = {
    // Hide legend
    legend: { display: false },
    scales: { yAxes: ticksOptions, xAxes: ticksOptions }
};

module.exports = {
    //Command Information
    name: "youtube",
    description: "Get information about a youtube channel",
    usage: "youtube {user}",
    enabled: true,
    aliases: [],
    category: "Statistics",
    memberPermissions: [],
    botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
    nsfw: false,
    cooldown: 3000,
    ownerOnly: false,

    async execute(client, message, args, data) {

      let channelID = !args[0] ? "ChilledCow" : args[0]

      let videoData = await helper.fetchChannel(channelID);
      let views = videoData.video.map(x => x.views)
      let time = videoData.video.map(x => x.videoTime)

      let totalViews = views.reduce((a, b) => a + b, 0);
      if(videoData === false){
        return message.channel.send("Issue trying to find the requested channel")
      }

      let colorArr = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
		  '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
		  '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
		  '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
		  '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
		  '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
		  '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
		  '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
		  '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
		  '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF']
      let color = await colorArr[Math.floor(Math.random()*colorArr.length)];
      const image = await canvasRenderService.renderToBuffer({
            type: "bar",
            data: {
                labels: time,
                datasets: [
                    {
                        data: views,
                        borderColor: `${color}`,
                        fill: true,
                        backgroundColor: `${color}`
                    }
                ],
            },
            options
        });

        const attachment = new Discord.MessageAttachment(image, "image.png");

        let embed = new Discord.MessageEmbed()
        .setTitle(videoData.channel.name)
        .setURL(videoData.channel.url)
        .setThumbnail(videoData.channel.avatar)
        .setDescription(`Total views in last 10 videos:\n**${totalViews}** Views`)
        .attachFiles(attachment)
        .setImage("attachment://image.png")
        .setFooter(data.config.footer)
        .setColor(color);

        return message.channel.send(embed)


    },
};
