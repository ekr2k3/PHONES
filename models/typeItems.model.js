const mongoose = require("mongoose");
var slug = require("mongoose-slug-updater");
mongoose.plugin(slug);
var schemaTy = new mongoose.Schema({
    title: String,
    slug_tu_dinh_nghia_ten_khac:{
        type:String,
        slug: "title",
        unique: true
    },
    parent_id : {
        type: String,
        default: ""
    },
    description: String,
    thumbnail: String,
    status: String,
    position: Number,
    deleted: {
        type:Boolean,
        default: false
    },
    dateDelete:Date
},{
    timestamps:true
});
var Type = mongoose.model("typeitems",schemaTy);
module.exports = Type;