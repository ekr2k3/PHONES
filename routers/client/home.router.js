const express = require("express");
var router = express.Router();
const controllerHome = require("../../controllers/client/home.controller");

router.get("/",controllerHome.clientHome );

module.exports = router;