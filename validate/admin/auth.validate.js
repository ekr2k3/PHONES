module.exports.loginForm = (req,res,next)=>{
    if(!req.body.email){
        req.flash("error","bạn chưa điền email");
        res.redirect("back");
        return;
    }
    if(!req.body.password){
        req.flash("error","bạn chưa điền password");
        res.redirect("back");
        return;
    }
    next();
}