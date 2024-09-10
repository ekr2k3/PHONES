const modelPro = require("./../../models/products.model");

const filterStatus = require("../../helpers/filterStatus");
const search = require("../../helpers/search");
/////////////////////////////////////////////////////////////////////////////
var option = {
    resource_type: 'auto'
};
var cloudinary = require("cloudinary").v2;
var upLoadToCloud = (buffer) => {
    var myPromise = new Promise((res, rej) => {
        //2. thực hiện đạn này sau khi có true or false
        var cb = (error, result) => {
            // SAU KHI VÀO ĐÂY <=> CODE TRẢ VỀ TRUE OR FALSE
            if (error) {
                console.error('Upload failed:', error);
                rej(error);
            } else {
                console.log('Upload successful:', result);
                res(result);
            }
        }
        //1. chạy vô đây trước để làm gì đó trả true or false
        const uploadStream = cloudinary.uploader.upload_stream(option, cb);
        uploadStream.end(buffer);
    });
    return myPromise;
}
module.exports.upToCloud = upLoadToCloud;
////////////////////////////////////////////////////////////////////////

module.exports.productsAdmin = async (req, res) => {
    var condition = {
        deleted: false
    }
    var FILTERSTATUS = filterStatus(req, condition);
    condition = FILTERSTATUS.CONDITION;
    condition = search(req, condition);

    var data = await modelPro.find(condition);
    for (var i = 0; i < data.length; i++) {
        data[i].index = i;
    }
    var data = require("./../../helpers/sort.js")(req, data);
    var devicePage = require("../../helpers/devicePage")(req, data);
    res.render("admin/pages/products/index", {
        data: devicePage.data,
        buttons: FILTERSTATUS.default_buttons,
        keyw: req.query.keyword,
        NumberP: devicePage.numberOfPage,
        NowPage: parseInt(devicePage.pages)
    });
}
module.exports.ChangeStatus = async (req, res) => {
    var id = req.params.id;
    var status = req.params.status;

    await modelPro.updateOne({ _id: id }, { status: status });
    // object 1 truyền id, object 2 truyền các key-value muốn đổi
    req.flash("changeStatus", "SuccessFull, Tính năng thay đổi trạng thái 1 sản phẩm");
    res.redirect("back");
}

module.exports.ChangeMutilStatus = async (req, res) => {
    var changeManuStatus = require("../../helpers/changeManyStatus")(req);
    switch (changeManuStatus.Option) {
        case "active":
            await modelPro.updateMany({ _id: { $in: changeManuStatus.listID } }, { status: "active" });
            req.flash("changeActive", `Đã đổi ${changeManuStatus.listID.length} sản phẩm sang active`);
            break;
        case "inactive":
            await modelPro.updateMany({ _id: { $in: changeManuStatus.listID } }, { status: "inactive" });
            req.flash("changeInactive", `Đã đổi ${changeManuStatus.listID.length} sản phẩm sang inactive`);
            break;
        case "delete":
            await modelPro.updateMany({ _id: { $in: changeManuStatus.listID } }, {
                deleted: "true",
                dateDelete: new Date()
            });
            req.flash("delete", `Đã xóa ${changeManuStatus.listID.length} sản phẩm`);
            break;
        case "position":
            for (var i = 0; i < changeManuStatus.listID.length; i++) {
                if (isNaN(parseInt(changeManuStatus.listPosition[i])) === false) {
                    await modelPro.updateOne(
                        { _id: changeManuStatus.listID[i] },
                        { position: changeManuStatus.listPosition[i] }
                    );
                }
            }
            req.flash("position", `Đã đổi vị trí ${changeManuStatus.listID.length} sản phẩm`);
            break;
    }
    res.redirect("back");
}

module.exports.delete = async (req, res) => {
    // res.send("connet successful");
    var id = req.params.id;
    await modelPro.updateOne({ _id: id }, {
        deleted: true,
        dateDelete: new Date()
    });

    res.redirect("back");
}
module.exports.trap = async (req, res) => {
    var condition = {
        deleted: true
    }
    var data = await modelPro.find(condition);

    res.render("admin/pages/products/trap", {
        data: data
    });

}

module.exports.orderFromTrap = async (req, res) => {
    var order = req.params.order;
    var id = req.params.id;
    if (order === "delete") {
        await modelPro.deleteOne({ _id: id });
    }

    if (order === "restore") {
        await modelPro.updateOne({ _id: id }, { deleted: false });
    }
    res.redirect("back")
}
var modelType = require("../../models/typeItems.model.js");
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
module.exports.creatGET = async (req, res) => {
    var data = await modelType.find({ deleted: false });
    createTree1(data);
    res.render("admin/pages/products/createPage.pug", {
        d: data
    });
}

module.exports.createPost = (req, res) => {
    var myPromiseUpload = upLoadToCloud(req.files.thumbnail[0].buffer);
    myPromiseUpload
        .then(async (result) => {
            var newData = {
                price: parseInt(req.body.price),
                title: req.body.titile,
                status: req.body.status,
                discountPercentage: parseFloat(req.body.discountPercentage),
                thumbnail: result.url,
                stock: parseInt(req.body.stock),
                description: req.body.description,
                Type: req.body.Type
            }
            if (req.body.position === "") {
                var count = await modelPro.find();
                newData.position = count.length + 1;
            }
            else {
                newData.position = parseInt(req.body.position)
            }
            // hoàn thành lấy data
            var newItem = new modelPro(newData);
            await newItem.save();
            res.redirect("/admin/products")
        })
}
module.exports.editGET = async (req, res) => {
    var id = req.params.id;
    var condition = {
        deleted: false,
        _id: id
    }
    try {
        var data = await modelPro.find(condition);
        var dataType = await modelType.find({ deleted: false });
        createTree1(dataType);
        console.log(data);
        // vì lúc in ra là mảng các object tuy chỉ 1 phần tử
        // nhưng bên pug sẽ phải là dataOld[0].Thuộc tính thay vì dataOld.thuộc tính
        res.render("admin/pages/products/edit.pug", {
            dataOld: data,
            dataType: dataType

        });
    } catch (error) {
        req.flash("error", "sản phẩm không tồn tại");
        res.redirect("/admin/products");
    }
}
module.exports.editPATCH = async (req, res) => {
    var id = req.params.id;
    var newData = {
        title: req.body.titile,
        description: req.body.description,
        price: parseInt(req.body.price),
        discountPercentage: parseFloat(req.body.discountPercentage),
        stock: parseInt(req.body.stock),
        status: req.body.status,
        position: parseInt(req.body.position),
        Type: req.body.Type
    }
    if (req.files.thumbnail !== undefined) {
        var myPromiseUpload = upLoadToCloud(req.files.thumbnail[0].buffer);
        myPromiseUpload.then(async (result) => {
            newData.thumbnail = result.url;
            await modelPro.updateOne({ _id: id }, newData);
            res.redirect("/admin/products");
        })
    }
    await modelPro.updateOne({ _id: id }, newData);
    res.redirect("/admin/products");
}
module.exports.detail = async (req, res) => {
    var id = req.params.id;
    var condition = {
        deleted: false,
        _id: id
    }
    try {
        var Data = await modelPro.findOne(condition);
        var dataType = await modelType.find({ deleted: false });
        res.render("admin/pages/products/detail.pug", {
            data: Data,
            dataType: dataType
        });
    } catch (error) {
        req.flash("error", "Sản phẩm không tồn tại");
        res.redirect("/admin/products");
    }
}