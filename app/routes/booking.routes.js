module.exports = app =>{
    const booking = require("../controller/booking.controller")

    let router = require("express").Router()
    
    router.post("/",booking.bookTicket);

    app.use("/api/booking",router)
}