var roleModel = require("../../models/role.model");

module.exports.roleGet = async (req, res) => {
    var data = await roleModel.find({
        deleted: false
    });
    res.render("admin/pages/roles/index.pug", {
        d: data
    });
}

module.exports.createGet = (req, res) => {
    res.render("admin/pages/roles/create.pug");
}

module.exports.createPost = async (req, res) => {
    req.body.title = req.body.titile;
    var item = new roleModel(req.body);
    await item.save()
    res.redirect("/admin/role");
}

module.exports.editGet = async (req, res) => {
    var data = await roleModel.findOne({
        deleted: false,
        _id: req.params.id
    })
    res.render("admin/pages/roles/edit.pug", {
        d: data
    })
}

module.exports.editPost = async (req, res) => {
    try {
        await roleModel.updateOne(
            {
                _id: req.params.id
            },
            {
                title: req.body.titile,
                description: req.body.description
            }
        )
        res.redirect("/admin/role")
    } catch (error) {
        // code if false
        redirect("back");
    }
}

module.exports.permissionGet = async (req, res) => {
    var data = await roleModel.find({
        deleted: false
    })

    res.render("admin/pages/roles/permission.pug", {
        d: data,
        d2: JSON.stringify(data)
    });
}
module.exports.permissionPatch = async (req, res) => {
    var data = req.body.permission_input;
    var Data = JSON.parse(data); // 1 mảng các object
    for (var i = 0; i < Data.length; i++) {
        await roleModel.updateOne(
            {
                _id: Data[i].id
            },
            {
                permissions: Data[i].permission
            }
        )
    }
    console.log(Data[0].permission);
    
    res.redirect("back");
}