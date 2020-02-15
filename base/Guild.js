const mongoose = require("mongoose"),
Schema = mongoose.Schema,
config = require("../config.js");

module.exports = mongoose.model("Guild", new Schema({

    id: { type: String },
    membersData: { type: Object, default: {} },
    members: [{ type: Schema.Types.ObjectId, ref: "Member" }],
    prefix: { type: String, default: config.prefix }, 


}));
