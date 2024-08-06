const express = require("express");
var router = express.Router();

const controllerProduct = require("../../controllers/client/product.controller");

router.get("/",controllerProduct.clientProducts);
router.get("/detail/:slug", controllerProduct.detailClient);
module.exports = router;