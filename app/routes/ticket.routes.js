module.exports = app => {
    const ticket = require("../controller/ticket.controller")

    let router = require("express").Router();

    router.post("/",ticket.create);

    router.post("/booking",ticket.bookTicket);

    router.post("/refund",ticket.cancelBooking);
    
    app.use("/api/tickets", router);
}