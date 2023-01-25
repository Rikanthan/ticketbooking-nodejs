const db = require("../models")
const crypto = require('crypto');
const Ticket = db.tickets;

exports.create = (req, res) => {
    let ticketArray = []
    for (let i = 0; i < req.body.noOfTickets; i++) {
        const ticket = new Ticket({
            ticketNo: crypto.randomUUID(),
            price: req.body.price,
            eventName: req.body.eventName,
            duration: req.body.duration,
            venue: req.body.venue,
            time: req.body.time
        })
        ticketArray.push(ticket);
    }
    Ticket.insertMany(ticketArray)
    .then(function(){
        res.status(201).send({message : "tickets added successfully!"})
    })
    .catch(function(error){
        res.status(500).send({message: error.message})
    })
}