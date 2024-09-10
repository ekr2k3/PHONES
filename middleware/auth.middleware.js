var acModel = require("../models/accounts.model");
var roleModel = require("../models/role.model");

module.exports.check = async (req, res, next) => {
    var token = req.cookies.Token;
    if (token) {
        var user = await acModel.findOne({
            deleted: false,
            token: token
        })
        if (user) {
            var role = await roleModel.findOne({
                deleted: false,
                _id : user.role_id
            })
            if(!role){
                console.log(role);
                res.redirect("/admin/auth/login");
                return;
            }

            // dến bước này ==> user và role của ông đó là có tồn tại
            res.locals.user = user
            res.locals.role = role
            next();
        }
        else {
            res.redirect("/admin/auth/login");
            return;
        }
    }
    else {
        res.redirect("/admin/auth/login");
        return;
    }
}