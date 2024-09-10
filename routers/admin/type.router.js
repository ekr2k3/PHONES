var express = require("express");
var rou = express.Router();

var typeController = require("../../controllers/admin/type.controller");





rou.get("/", typeController.typeGET);
rou.get("/create", typeController.createGET);

var multer = require("multer");
var uploads = multer();
var getFile = uploads.fields(
    [
        {
            name: "thumbnail",
            maxCount: 1
        }
    ]

)
var validateType = require("../../validate/admin/type.validate");
rou.post("/create", getFile, validateType.createPost, typeController.createPOST);
rou.get("/edit/:id", typeController.editGET);
rou.patch("/edit/:id", getFile, validateType.editPATCH, typeController.editPATCH);
module.exports = rou;