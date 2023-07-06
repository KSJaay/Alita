const replacers = (str = "", user, guild) => {
  const replacers = {
    "{user.ping}": `${user}`,
    "{user.name}": user.username,
    "{user.id}": user.id,
    "{guild.name}": guild.name,
    "{guild.id}": guild.id,
    "{guild.totalUser}": guild.memberCount,
  };

  const replacedStr = str.replace(
    /\{user.ping\}|\{user.name\}|\{user.id\}|\{guild.name\}|\{guild.id\}|\{guild.totalUser\}/gi,
    (matched) => replacers[matched]
  );

  return replacedStr;
};

module.exports = replacers;
