var modelAccount = require("../../models/accounts.model");

module.exports.createPost = async (req, res, next) => {
    if (!(req.body.fullname)) {
        req.flash("error", "Bạn cần nhập tên");
        res.redirect("back");
        return;
    }
    if (!(req.body.status)) {
        req.flash("error", "Bạn cần nhập Hành Động");
        res.redirect("back");
        return;
    }
    if (!(req.body.email)) {
        req.flash("error", "Bạn cần nhập email");
        res.redirect("back");
        return;
    }
    else {
        var dataAccount = await modelAccount.find({
            email: req.body.email,
            deleted: false
        })
        if (dataAccount.length > 0) { /// tức có tồn tại email trùng
            req.flash("error", "email đã được sử dụng");
            res.redirect("back");
            return;
        }
    }
    if (!(req.body.password)) {
        req.flash("error", "Bạn cần nhập password");
        res.redirect("back");
        return;
    }
    if (!(req.body.phone)) {
        req.flash("error", "Bạn cần nhập số điện thoại");
        res.redirect("back");
        return;
    }
    if (!(req.body.role_id)) {
        req.flash("error", "Bạn cần nhập vai trò");
        res.redirect("back");
        return;
    }
    if (req.files.avata) {
        var y = await require("../../controllers/admin/products.controller").upToCloud(req.files.avata[0].buffer);
        var result = y;
        req.body.avata = result.url;
    }
    else {
        req.body.avata = "";
    }
    next();
}

module.exports.editPatch = async (req, res, next) => {
    if (!(req.body.fullname)) {
        req.flash("error", "Bạn cần nhập tên");
        res.redirect("back");
        return;
    }
    if (!(req.body.status)) {
        req.flash("error", "Bạn cần nhập Hành Động");
        res.redirect("back");
        return;
    }
    if (!(req.body.email)) {
        req.flash("error", "Bạn cần nhập email");
        res.redirect("back");
        return;
    }
    else {
        // thông tin email cũ của đối tượng hiện tại
        var myAccount = await modelAccount.findOne({
            _id: req.params.id,
            deleted: false
        })
         // kiểm tra thông tin email cũ của đối tượng hiện tại vs thông tin email lần gửi lên mới nhất đối tượng hiện tại
        if (myAccount.email !== req.body.email) {
            // kiểm tra tiếp với các đối tượng khác với đối tượng hiện tại
            var dataAccount = await modelAccount.findOne({
                email: req.body.email,
                deleted: false
            })
            if (dataAccount) {
                req.flash("error", "email đã được sử dụng bởi người khác");
                res.redirect("back");
                return;
            }
        }
    }
    if (!(req.body.phone)) {
        req.flash("error", "Bạn cần nhập số điện thoại");
        res.redirect("back");
        return;
    }
    if (!(req.body.role_id)) {
        req.flash("error", "Bạn cần nhập vai trò");
        res.redirect("back");
        return;
    }
    if (req.files.avata) {
        var y = await require("../../controllers/admin/products.controller").upToCloud(req.files.avata[0].buffer);
        var result = y;
        req.body.avata = result.url;
    }
    else {
        var myAccount = await modelAccount.findOne({
            _id: req.params.id,
            deleted: false
        })
        req.body.avata = myAccount.avata;
    }
    next();
}



