const mongoose = require("mongoose");

module.exports = mongoose.model("Member", new mongoose.Schema({
    id: { type: String }, //ID of the user
    guild: { type: String }, //ID of the guild
    registeredAt: { type: Number, default: Date.now() }
}));