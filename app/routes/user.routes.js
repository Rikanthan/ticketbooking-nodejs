module.exports = app => {
    const users = require("../controller/user.controller")

    let router = require("express").Router();

    router.post("/register",users.create);

    router.get("/login",users.findOne);
    
    app.use("/api/users", router);
}