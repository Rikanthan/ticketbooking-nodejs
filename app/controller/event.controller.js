const db = require("../models")
const crypto = require('crypto');
const Event = db.events;

exports.create = (req, res) => {
        const event = new Event({
            eventId: crypto.randomUUID(),
            eventName: req.body.eventName,
            duration: req.body.duration,
            venue: req.body.venue,
            dateTime: req.body.dateTime
        })
    event.save(event)
    .then(function(){
        res.status(201).send({message : "event added successfully!"})
    })
    .catch(function(error){
        res.status(500).send({message: error.message})
    })
}