const mongoose = require("mongoose");

module.exports = async ()=>{
    try {
        await mongoose.connect(process.env.mongoDB);
        console.log("Success for connect database");
        console.log("database in config:" + process.cwd());
    } catch (error) {
        console.log(error);
    }
}