const mongoose = require("mongoose");

module.exports = mongoose.model("User", new mongoose.Schema({

    /* REQUIRED */
    id: { type: String }, // Discord ID of the user

    /* STATS */
    registeredAt: { type: Number, default: Date.now() }, // Registered date of the member
}));
