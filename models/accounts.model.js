const mongoose = require("mongoose");

function generateRandomString() {
    
    var length = 20;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
} // đơn giản đây là 1 hàm tạo chuỗi random


var schemaAccounts = new mongoose.Schema({
    email: String,
    password: String,
    deleted: {
        type: Boolean,
        default: false
    },
    dateDelete: Date,
    fullname: String,
    phone: String,
    role_id: String,
    status: String, // Dùng để khóa tài khoản có vấn đề
    avata: String,
    token: {    // định danh người dùng
        type: String,
        default: generateRandomString // tạo token, mục đích random để tránh bị trùng nhau
    }
}, {
    timestamps: true
});
var accounts = mongoose.model("accounts", schemaAccounts);
module.exports = accounts;







