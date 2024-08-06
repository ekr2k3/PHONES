const routerHome = require("./home.router");
const routerProduct = require("./product.router");

const useRouter =(app) =>{
    app.use('/',routerHome);
    app.use('/products',routerProduct);
}

module.exports = useRouter;

