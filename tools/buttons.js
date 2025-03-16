const { ActionRowBuilder, ButtonBuilder } = require("discord.js");

function createButtons(data, withBuilder = true) {
  const components = data.map(
    ({ custom_id, style, emoji, label, url, disabled }) => {
      const id = !custom_id ? { url } : { custom_id };
      return new ButtonBuilder({
        ...id,
        type: 2,
        custom_id,
        style,
        emoji,
        label,
        disabled,
      });
    }
  );
  return withBuilder
    ? new ActionRowBuilder().addComponents(...components)
    : components;
}

module.exports = createButtons;
