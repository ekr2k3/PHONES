var acModel = require("../../models/accounts.model");
var md5 = require("md5")
module.exports.loginGet = (req,res)=>{
    res.render("admin/pages/auth/login.pug");
}

module.exports.loginPost = async(req,res)=>{
    var Account = await acModel.findOne({
        deleted: false,
        email: req.body.email
    })
    if(!Account){
        req.flash("error", "tài khoản không tồn tại")
        res.redirect("back");
        return;
    }
    if(Account.password !== md5(req.body.password)){
        req.flash("error", "sai mật khẩu")
        res.redirect("back");
        return;
    }
    if(Account.status == "inactive"){
        req.flash("error", "Tài khoản đã bị khóa")
        res.redirect("back");
        return;
    }
    // Nếu vượt qua hết --> tài khoản hợp lệ mới cho thực hiện code ở dưới
    res.cookie("Token", Account.token);
    res.redirect("/admin/dashboard")
}

module.exports.logoutGet = (req,res)=>{
    res.clearCookie("Token");
    res.redirect("/admin/auth/login");
}