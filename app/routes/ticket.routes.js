module.exports = app => {
    const ticket = require("../controller/ticket.controller")

    let router = require("express").Router();

    router.post("/",ticket.create);
    
    app.use("/api/tickets", router);
}