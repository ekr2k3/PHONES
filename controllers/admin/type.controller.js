var typ = require("../../models/typeItems.model");

function createTree1(arr) {
    for (var i = 0; i < arr.length; i++) {
        arr[i].child = []; // khởi tạo thêm thuộc tính child vào object
        // với giớ trị là 1 mảng rỗng
    }

    for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < arr.length; j++) {
            if (i != j) {
                if (arr[i].parent_id == arr[j].id) {
                    arr[j].child.push(arr[i]);
                }
            }
        }
    }
}

module.exports.typeGET = async (req, res) => {
    var condition = {
        deleted: false
    }
    var data = await typ.find(condition);
    createTree1(data);
    res.render("admin/pages/types/index.pug", {
        d: data
    });
}
module.exports.createGET = async (req, res) => {
    var condition = {
        deleted: false
    }
    var data = await typ.find(condition);
    createTree1(data);
    console.log(data);
    res.render("admin/pages/types/create.pug", {
        d: data
    });
}

module.exports.createPOST = async (req, res) => {
    req.body.title = req.body.titile;
    var item = new typ(req.body);
    await item.save();
    res.redirect("/admin/type");
}

module.exports.editGET = async (req, res) => {
    var condition = {
        deleted: false,
        _id: req.params.id
    }
    var data = await typ.findOne(condition);

    var condition2 = {
        deleted: false
    }
    var allData = await typ.find(condition2);
    createTree1(allData);
    res.render("admin/pages/types/edit.pug", {
        d: data,
        aD: allData
    });
}

module.exports.editPATCH = async (req, res) => {
    try {
        await typ.updateOne(
            { _id: req.params.id },
            {
                title: req.body.titile,
                thumbnail: req.body.thumbnail,
                status: req.body.status,
                parent_id: req.body.parent_id,
                position: req.body.position,
                description: req.body.description
            }
        );
        req.flash("success", "done");
        res.redirect("/admin/type");
    } catch (error) {
        req.flash("error", "false");
        res.redirect("/admin/type");
    }
}