const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Guild",
  new mongoose.Schema({
    id: {type: String}, //ID of the guild
    registeredAt: {type: Number, default: Date.now()},

    goodbye: {
      type: Object,
      default: {
        enabled: false, // Goodbye messages are enabled
        channel: null, // ID for the channel to send messages to
        message: null, // Custom message
        image: false, // Check if image is enabled
        embed: false, // Check if embed is enabled
      },
    }, //Goodbye data

    welcome: {
      type: Object,
      default: {
        enabled: false, // Welcome messages are enabled
        channel: null, // ID for the channel to send messages to
        message: null, // Custom message
        image: false, // Check if image is enabled
        embed: false, // Check if embed is enabled
      },
    }, //Welcome data
  })
);
