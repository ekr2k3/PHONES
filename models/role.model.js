const mongoose = require("mongoose");
var schemaRole = new mongoose.Schema({
    title: String,
    description: String,
    deleted: {
        type:Boolean,
        default: false
    },
    dateDelete:Date,
    permissions: {
        type: Array,
        default: []
    }
},{
    timestamps:true
});
var role = mongoose.model("roles",schemaRole);
module.exports = role;