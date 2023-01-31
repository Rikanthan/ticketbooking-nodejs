module.exports = app => {
    const ticket = require("../controller/event.controller")

    let router = require("express").Router();

    router.post("/",ticket.create);
    
    app.use("/api/event", router);
}