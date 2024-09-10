var express = require("express");
var rou = express.Router();

var roleValidate = require("../../validate/admin/role.validate");
var roleController = require("../../controllers/admin/role.controller");
rou.get("/", roleController.roleGet);
rou.get("/create", roleController.createGet);
rou.post("/create", roleValidate.createPost, roleController.createPost);

rou.get("/edit/:id", roleController.editGet);
rou.patch("/edit/:id", roleValidate.editPost, roleController.editPost);

rou.get("/permission", roleController.permissionGet);
rou.patch("/permission", roleController.permissionPatch);

module.exports = rou;