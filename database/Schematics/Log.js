const mongoose = require("mongoose");

module.exports = mongoose.model("Log", new mongoose.Schema({

    //Storing information about each command that is ran
    commandName: { type: String, default: "unknown" },
    date: { type: Number, default: Date.now() },
    author: { type: Object, default: {
        username: "Unknown",
        discrminator: "0000",
        id: null
    }},
    guild: { type: Object, default: {
        name: "Unknown",
        channel: null,
        id: null
    }}

}));
