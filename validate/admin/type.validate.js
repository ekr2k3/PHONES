module.exports.createPost = async (req, res, next) => {
    if (!(req.body.titile)) {
        req.flash("error", "Bạn cần nhập tiêu đề");
        res.redirect("back");
        return;
    }
    if (!(req.body.status)) {
        req.flash("error", "Bạn cần nhập Hành Động");
        res.redirect("back");
        return;
    }
    if (req.body.position) {
        req.body.position = parseInt(req.body.position);
    }
    else {
        var x = require("../../models/typeItems.model");
        var data = await x.find({ deleted: false });
        var TheNumber = data.length;
        req.body.position = TheNumber;
    }
    if (req.files.thumbnail) {
        var y = await require("../../controllers/admin/products.controller").upToCloud(req.files.thumbnail[0].buffer);
        var result = y;
        req.body.thumbnail = result.url;
    }
    else {
        req.body.thumbnail = "";
    }
    next();
}

module.exports.editPATCH = async (req, res, next) => {
    if (!(req.body.titile)) {
        req.flash("error", "Bạn cần nhập tiêu đề");
        res.redirect("back");
        return;
    }
    if (!(req.body.status)) {
        req.flash("error", "Bạn cần nhập Hành Động");
        res.redirect("back");
        return;
    }
    if (req.body.position) {
        req.body.position = parseInt(req.body.position);
    }
    else {
        var x = require("../../models/typeItems.model");
        var data = await x.find({ deleted: false });
        var TheNumber = data.length;
        req.body.position = TheNumber;
    }
    if (req.files.thumbnail) {
        var y = await require("../../controllers/admin/products.controller").upToCloud(req.files.thumbnail[0].buffer);
        var result = y;
        req.body.thumbnail = result.url;
    }
    else {
        var x = require("../../models/typeItems.model");
        var data = await x.findOne({_id: req.params.id});
        req.body.thumbnail = data.thumbnail;
    }
    next();
}