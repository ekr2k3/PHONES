const mongoose = require("mongoose");
var slug = require("mongoose-slug-updater");
mongoose.plugin(slug);// đăng ký 1 plugin là slug cho mongoose, dây là hàm của mongoose
// Search how to create plugin mongoose
var schemaPro = new mongoose.Schema({
    title: String,
    slug_tu_dinh_nghia_ten_khac:{
        type:String,
        slug: "title",
        unique: true
    },
    description: String,
    price: Number,
    discountPercentage: Number,
    stock: Number,
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
var pro = mongoose.model("phones",schemaPro);
module.exports = pro;