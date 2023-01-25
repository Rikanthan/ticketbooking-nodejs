const db = require("../models")
const crypto = require('crypto');
const Booking = db.bookings

exports.create = (req, res) => {
    const booking = new Booking({
        bookingId: crypto.randomUUID(),
        userId: req.body.userId,
        noOfTickets: req.body.noOfTickets,
        ticketId: req.body.ticketId
    })
    booking
    .save(booking)
    .then(data =>{
        res.status(201).send(data)
    }).catch(error =>{
        res.status(500).send({message : "booking failed"})
    })
}