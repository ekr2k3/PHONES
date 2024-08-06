const mongoose = require("mongoose");

module.exports = async ()=>{
    try {
        await mongoose.connect(process.env.mongoDB);
        console.log("Success for connect database");
        console.log("here is __dirname in config:  " + __dirname);
    } catch (error) {
        console.log(error);
    }
}