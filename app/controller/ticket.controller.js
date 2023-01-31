const db = require("../models")
const crypto = require('crypto');
const Ticket = db.tickets;
const Event = db.events;

exports.create = async (req, res) => {
    let isValid = true;
    try {
       const doc = await Event.findOne({eventId: req.body.eventId})
       isValid = doc.eventId === req.body.eventId ? true : false;
    }
    catch (err) {
        isValid = false;
    }
    if (isValid) {
        try {
            let ticketArray = []
            for (let i = 0; i < req.body.noOfTickets; i++) {
                const ticket = new Ticket({
                    ticketNo: crypto.randomUUID(),
                    eventId: req.body.eventId
                })
                ticketArray.push(ticket);
            }
           await Ticket.insertMany(ticketArray)
                .then(function () {
                    res.status(201).send({ message: "tickets added successfully!" })
                })
                .catch(function (error) {
                    res.status(500).send({ message: error.message })
                })
        }
        catch (err) {
            res.status(500).send({message : "event not found"})
        }
    }else{
        res.status(500).send({message : "event not found"})
    }

}