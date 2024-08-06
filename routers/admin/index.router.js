var rouDashboard = require("./dashboar.router");
var rouProducts = require("./products.router");

var prefix = require("../../system").prefix;

module.exports = (app)=>{
    app.use(prefix + "/dashboard",rouDashboard);
    app.use(prefix + "/products",rouProducts);
}

