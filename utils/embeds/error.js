module.exports = (embed = {}) => {
  return {
    title: "Uh Oh!",
    color: 7143340,
    footer: {
      text: "By KSJaay",
      icon_url: "https://avatars.githubusercontent.com/u/50052603?s=96&v=4",
    },
    ...embed,
  };
};
