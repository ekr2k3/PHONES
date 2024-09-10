module.exports.createPost = (req,res,next) =>{
    if(!req.body.titile){
        res.redirect("back");
        return
    }
    if(!req.body.description){
        req.body.description = "";
    }

    next();
}

module.exports.editPost = (req,res,next) =>{
    if(!req.body.titile){
        res.redirect("back");
        return
    }
    if(!req.body.description){
        req.body.description = "";
    }

    next();
}