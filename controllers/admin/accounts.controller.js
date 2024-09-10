var roleModel = require("../../models/role.model");
var accModel = require("../../models/accounts.model");
var md5 = require("md5");
module.exports.accountGet = async (req, res) => {
    var data = await accModel.find({
        deleted: false
    })
    var dataRole = await require("../../models/role.model").find({
        deleted: false
    });
    res.render("admin/pages/accounts/index.pug", {
        d: data,
        drole: dataRole
    });
}

module.exports.createGet = async (req, res) => {
    var data = await roleModel.find({
        deleted: false
    })
    res.render("admin/pages/accounts/create.pug", {
        d: data
    });
}

module.exports.createPost = async (req, res) => {
    req.body.password = md5(req.body.password);
    var items = new accModel(req.body);
    await items.save();
    res.redirect("/admin/accounts");
}


module.exports.editGet = async (req, res) => {

    var id = req.params.id;
    var recordOld = await accModel.findOne({ _id: id });
    var listRole = await roleModel.find({ deleted: false });

    res.render("admin/pages/accounts/edit.pug", {
        r: recordOld,
        l: listRole
    })
}

module.exports.editPatch = async (req, res) => {

    var id = req.params.id;
    var x = {};

    // Kiểm tra nếu mật khẩu trống
    if (req.body.password === "") {
        // Lặp qua tất cả các key trong req.body
        for (var key in req.body) {
            // Nếu key không phải là "password", thêm vào đối tượng x
            if (key !== "password") {
                x[key] = req.body[key];
            }
        }// kết for
        req.body = x;
    }
    else{
        req.body.password = md5(req.body.password);
    }

    await accModel.updateOne({_id: id}, req.body);
    res.redirect("/admin/accounts")
}