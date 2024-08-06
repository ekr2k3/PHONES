module.exports.create = (req, res, next) => {
    if (req.files.thumbnail === null || req.files.thumbnail === undefined) {
        req.flash("error", "Hãy nhập dữ liệu vào trường ảnh");
        res.redirect("back");
        return;
    }
    if (req.body.titile === null || req.body.titile === "" || req.body.titile === undefined) {
        req.flash("error", "Hãy nhập dữ liệu vào trường tiêu đề");
        res.redirect("back");
        return;
    }
    if (req.body.price === null || req.body.price === "" || req.body.price === undefined) {
        req.flash("error", "Hãy nhập dữ liệu vào trường Giá");
        res.redirect("back");
        return;
    }
    if (req.body.discountPercentage === null || req.body.discountPercentage === "" || req.body.discountPercentage === undefined) {
        req.flash("error", "Hãy nhập dữ liệu vào trường % giảm giá");
        res.redirect("back");
        return;
    }
    if (req.body.stock === null || req.body.stock === "" || req.body.stock === undefined) {
        req.flash("error", "Hãy nhập dữ liệu vào trường số lượng");
        res.redirect("back");
        return;
    }

    next();
}

module.exports.edit = (req, res, next) => {
    if (req.body.titile === null || req.body.titile === "" || req.body.titile === undefined) {
        req.flash("error", "Hãy nhập dữ liệu vào trường tiêu đề");
        res.redirect("back");
        return;
    }
    if (req.body.price === null || req.body.price === "" || req.body.price === undefined) {
        req.flash("error", "Hãy nhập dữ liệu vào trường Giá");
        res.redirect("back");
        return;
    }
    if (req.body.discountPercentage === null || req.body.discountPercentage === "" || req.body.discountPercentage === undefined) {
        req.flash("error", "Hãy nhập dữ liệu vào trường % giảm giá");
        res.redirect("back");
        return;
    }
    if (req.body.stock === null || req.body.stock === "" || req.body.stock === undefined) {
        req.flash("error", "Hãy nhập dữ liệu vào trường số lượng");
        res.redirect("back");
        return;
    }

    next();
}