module.exports = {
	name: 'ping',
	description: 'Responds with the clients ping',
	usage: 'Ping',
	execute(message, args) {
    // Send a message
    message.channel.send(`Pinging....`).then((m) => {
      let latencyPing =Math.floor( m.createdTimestamp - message.createdTimestamp)
        m.delete()
        message.channel.send(`Latency: `+"``"+ `${latencyPing}`+"``"+ "ms\n");

  });
	},
};
