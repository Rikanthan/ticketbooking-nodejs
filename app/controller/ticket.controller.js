const db = require("../models")
const crypto = require('crypto');
const Ticket = db.tickets;
const Event = db.events;
const User = db.users

exports.create = async (req, res) => {
    let isValid = true;
    try {
        const doc = await Event.findOne({ eventId: req.body.eventId })
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
            res.status(500).send({ message: "event not found" })
        }
    } else {
        res.status(500).send({ message: "event not found" })
    }
}

exports.bookTicket = async (req, res) => {
    let isValidUser = false;
    try {
        const doc = await User.findOne({ userId: req.body.userId })
        isValidUser = doc.userId === req.body.userId ? true : false
    } catch (err) {
        res.status(500).send({ message: "user not found " })
    }
    if (isValidUser) {
        try {
            let condition = { isBooked: false };
            await Ticket
                .find(condition)
                .sort({ ticketNo: 1 })
                .limit(req.body.noOfTickets)
                .exec(updateTickets)
        } catch (err) {

        }
    }
    function updateTickets(err, tickets) {
        if (err) {
            return handleError(res, err);
        }
        let ticketNo = tickets.map(function (item) {
            return item.ticketNo;
        })
        const update = {
            $set: {
                isBooked: true,
                userId: req.body.userId
            }
        }
        const options = { upsert: true, timestamps: true }
        function callback() {
            return res.status(200).send({ message: "Ticket booked successfully!" })
        }
        return Ticket.updateMany(
            { ticketNo: { $in: ticketNo } },
            update,
            options,
            callback
        );
    }
}

exports.cancelBooking = async (req, res) => {

   await Ticket
        .find({
            isBooked: true,
            userId: req.body.userId,
            eventId: req.body.eventId
        })
        .limit(req.body.noOfTickets)
        .exec(cancelTickets)

    function cancelTickets(err, tickets) {
        if (err) {
            return handleError(res, err);
        }
        let ticketNo = tickets.map(function (item) {
            return item.ticketNo;
        })
        const update = {
            $set: {
                isBooked: false,
            }
        }
        const options = { upsert: true, timestamps: true }
        function callback() {
            return res.status(200).send({ message: "Ticket cancelled successfully!" })
        }
        return Ticket.updateMany(
            { ticketNo: { $in: ticketNo } },
            update,
            options,
            callback
        );
    }
}