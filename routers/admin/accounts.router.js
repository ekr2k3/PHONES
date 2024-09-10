var express = require("express");
var rou = express.Router();

var accountsController = require("../../controllers/admin/accounts.controller");

var multer = require("multer");
var uploads = multer();
var getFile = uploads.fields(
    [
        {
            name: "avata",
            maxCount: 1
        }
    ]

)
var validateAccount = require("../../validate/admin/accounts.validate");


rou.get("/", accountsController.accountGet);
rou.get("/create", accountsController.createGet);
rou.post("/create", getFile, validateAccount.createPost, accountsController.createPost);

rou.get("/edit/:id", accountsController.editGet);
rou.patch("/edit/:id", getFile, validateAccount.editPatch, accountsController.editPatch);
module.exports = rou;


