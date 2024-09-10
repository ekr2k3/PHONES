var express = require("express");
var rou = express.Router();

var controllerAuth = require("../../controllers/admin/auth.controller");
var validateAuth = require("../../validate/admin/auth.validate");
rou.get("/login", controllerAuth.loginGet);
rou.post("/login",validateAuth.loginForm, controllerAuth.loginPost);

rou.get("/logout", controllerAuth.logoutGet);

module.exports = rou;