var modelPro = require("../../models/products.model");

module.exports.clientProducts = async (req, res) => {

    var condition = {
        deleted: false,
        status: "active"
    }

    var data = await modelPro.find(condition);
    for (var i = 0; i < data.length; i++) {
        data[i].index = i;
    };
    for (var i = 0; i < data.length - 1; i++) {
        for (var j = i + 1; j < data.length; j++) {
            if (data[i].position > data[j].position) {
                var temp = {};
                temp = data[j];
                data[j] = data[i];
                data[i] = temp;
            }
            else if (data[i].position === data[j].position && data[i].index > data[j].index) {
                var temp = {};
                temp = data[j];
                data[j] = data[i];
                data[i] = temp;
            }
        }
    };
    for (var i = 0; i < data.length; i++) {
        data[i].priceNew = data[i].price - data[i].price * data[i].discountPercentage / 100;
    }
    var dataSlug = [];
    for (var i = 0; i < data.length; i++) {
        if (data[i].slug_tu_dinh_nghia_ten_khac !== undefined) {
            dataSlug.push(data[i]);
        }
    }
    data = dataSlug;
    console.log(data);
    res.render("client/pages/products/index.pug", {
        pageTitle: "products",
        data: data
    });
}
module.exports.detailClient = async (req, res) => {
    var slug = req.params.slug;
    condition = {
        deleted: false,
        status: "active",
        slug_tu_dinh_nghia_ten_khac: slug
    }
    try {
        var data = await modelPro.findOne(condition);
        if (!data) {
            req.flash("error", "lỗi tìm kiếm");
            res.redirect("/products");
        }
        res.render("client/pages/products/detailClient.pug", {
            data: data
        })
    } catch (error) {
        req.flash("error", "lỗi tìm kiếm");
        res.redirect("/products");
    }
}