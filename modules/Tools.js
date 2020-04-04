module.exports.MapCats = (client, cat) => {
    return client.commands.filter(cmd => cmd.category === cat).map(cmd => cmd.name).join(", ");
};
