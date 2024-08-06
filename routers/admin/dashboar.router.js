var express = require("express");
var rou = express.Router();

var dashboardController = require("../../controllers/admin/dashboard.controller");

rou.get("/",dashboardController.dashboard);

module.exports = rou;