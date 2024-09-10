var rouDashboard = require("./dashboar.router");
var rouProducts = require("./products.router");
var rouType = require("./type.router");
var rouRole = require("./role.router");
var rouAccounts = require("./accounts.router");
var rouAuth = require("./auth.router");

var prefix = require("../../system").prefix;
var authMiddleware = require("../../middleware/auth.middleware");
module.exports = (app) => {
    app.use(prefix + "/dashboard", authMiddleware.check, rouDashboard);
    app.use(prefix + "/products", authMiddleware.check, rouProducts);
    app.use(prefix + "/type", authMiddleware.check, rouType);
    app.use(prefix + "/role", authMiddleware.check, rouRole);
    app.use(prefix + "/accounts", authMiddleware.check, rouAccounts);
    app.use(prefix + "/auth", rouAuth);
}


