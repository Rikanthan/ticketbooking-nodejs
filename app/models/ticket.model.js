module.exports = mongoose => {
    let schema = mongoose.Schema({
        ticketNo : int,
        price : double,
        eventName : String,
        duration : String,
        venue : String,
        time : Date
    });

    schema.method("toJSON", function(){
        const {__v, _id, ...object} = this.toObject();
        object.id = _id;
        return object;
    })

    const Ticket = mongoose.model(
        "ticket", schema
    );
    return Ticket;
}