module.exports = app => {
    const users = require("../controller/user.controller")

    let router = require("express").Router();

    router.post("/",users.create);
    
    app.use("/api/users", router);
}