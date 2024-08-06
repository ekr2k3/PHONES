const express = require("express");

const methodOverride = require("method-override");

const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("express-flash");

require("dotenv").config();
const app = express();
app.use(express.urlencoded({extended:false}));
app.use(methodOverride('_method'));

app.use(cookieParser("ABC")); // Giá trị truyền vào là tự chọn
app.use(session({
    cookie:{maxAge: 12000} // tồn tại 2 phút
}));
app.use(flash());


const port = process.env.PORT;
const configDataBase = require("./config/products.database");
const useRouter = require("./routers/client/index.router");

const useRouterAdmin = require("./routers/admin/index.router");

app.set("views", `views`);
app.set("view engine", "pug");
app.use(express.static(`public`));


configDataBase();


var prefix = require("./system").prefix;
app.locals.prefix = prefix;

useRouter(app);
useRouterAdmin(app);

app.listen(port, ()=>{
    console.log("server run by port: " + port);
    console.log("here is __dirname:  " + __dirname);
});
