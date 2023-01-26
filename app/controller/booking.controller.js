const db = require("../models")
const crypto = require('crypto');
const Booking = db.bookings
const Ticket = db.tickets

exports.create = (req, res) => {
    const booking = new Booking({
        bookingId: crypto.randomUUID(),
        userId: req.body.userId,
        noOfTickets: req.body.noOfTickets,
        ticketId: req.body.ticketId
    })
    booking
        .save(booking)
        .then(data => {
            res.status(201).send(data)
        }).catch(error => {
            res.status(500).send({ message: "booking failed" })
        })
}

exports.bookTicket = (req, res) => {
    let condition = { isBooked: false };
    Ticket
        .find(condition)
        .sort({ ticketNo: 1 })
        .limit(req.body.noOfTickets)
        .exec(updateTickets);

    function updateTickets(err, tickets) {
        if (err) {
            return handleError(res, err);
        }
        let ticketNo = tickets.map(function (item) {
            return item.ticketNo;
        })

        return Ticket.updateMany(
            { ticketNo: { $in: ticketNo } },
            {
                $set: {
                    isBooked: true,
                    userId: req.body.userId,
                    bookedTime: new Date()
                },
            },
            { upsert: true },
            callback
        )

        function callback() {
            return res.status(200).send({ message: "Ticket booked successfully!" })
        }
    }

}