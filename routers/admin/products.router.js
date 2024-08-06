var express = require("express");
var rou = express.Router();
var multer = require("multer");

var uploads = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "public/uploads");
        },
        filename: (req, file, cb) => {
            var uniqueID = Date.now();
            cb(null, uniqueID + " - " + file.originalname);
        }
    })
});

var productsController = require("../../controllers/admin/products.controller");
var getFile = uploads.fields(
    [
        {
            name: "thumbnail",
            maxCount: 1
        }
    ]

)

rou.get("/", productsController.productsAdmin);

rou.patch("/change-status/:status/:id", productsController.ChangeStatus);

rou.patch("/change-mutil-status", productsController.ChangeMutilStatus);

rou.delete("/delete-oneF/:id", productsController.delete);


rou.get("/trap", productsController.trap);
rou.delete("/fromTrap/:id/:order", productsController.orderFromTrap);

rou.get("/create", productsController.creatGET);

var checkValidateProducts = require("../../validate/admin/products.validate");

rou.post("/create", getFile, checkValidateProducts.create, productsController.createPost);

rou.get("/edit/:id", productsController.editGET);
rou.patch("/edit/:id", getFile, checkValidateProducts.edit, productsController.editPATCH);

rou.get("/detail/:id",productsController.detail);
module.exports = rou;
