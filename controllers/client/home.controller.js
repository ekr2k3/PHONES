module.exports.clientHome = (req,res)=>{
    res.render("./client/pages/home/index.pug",{
        pageTitle: "home"
    });
}