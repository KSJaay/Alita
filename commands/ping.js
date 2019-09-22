module.exports = {
	name: 'ping',
	description: 'Prune up to 99 messages.',
	usage: 'Enter Number of messages you want to delete between 1 and 99',
	execute(message, args) {
    // Send a message
    message.channel.send(`Pinging....`).then((m) => {
      let latencyPing =Math.floor( m.createdTimestamp - message.createdTimestamp)
        m.delete()
        message.channel.send(`Latency: `+"``"+ `${latencyPing}`+"``"+ "ms\n");
    
  });
	},
};
