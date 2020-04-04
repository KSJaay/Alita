const mongoose = require("mongoose");

module.exports = mongoose.model("Member", new mongoose.Schema({

    /* REQUIRED */
    id: { type: String }, // Discord ID of the user
    guildID: { type: String }, // ID of the guild to which the member is connected

    /* STATS */
    registeredAt: { type: Number, default: Date.now() }, // Registered date of the member

}));
