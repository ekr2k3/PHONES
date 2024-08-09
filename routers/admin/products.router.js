var express = require("express");
var rou = express.Router();
var multer = require("multer");
var productsController = require("../../controllers/admin/products.controller");
var checkValidateProducts = require("../../validate/admin/products.validate");
/////////////////////////////////////////////////////////////////////////////////////////
var uploads = multer();
var getFile = uploads.fields(
    [
        {
            name: "thumbnail",
            maxCount: 1
        }
    ]

)

/////////////////////////////////////////////////////////////////////////////////////
rou.get("/", productsController.productsAdmin);

rou.patch("/change-status/:status/:id", productsController.ChangeStatus);

rou.patch("/change-mutil-status", productsController.ChangeMutilStatus);

rou.delete("/delete-oneF/:id", productsController.delete);


rou.get("/trap", productsController.trap);
rou.delete("/fromTrap/:id/:order", productsController.orderFromTrap);

rou.get("/create", productsController.creatGET);

rou.post("/create", getFile, checkValidateProducts.create, productsController.createPost);

rou.get("/edit/:id", productsController.editGET);
rou.patch("/edit/:id", getFile, checkValidateProducts.edit, productsController.editPATCH);

rou.get("/detail/:id",productsController.detail);
module.exports = rou;
