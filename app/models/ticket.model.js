module.exports = mongoose => {
    let schema = mongoose.Schema({
        ticketNo :{type : String , unique : true},
        price : Number,
        eventName : String,
        duration : String,
        venue : String,
        time : Date,
        isBooked : {type : Boolean, default: false}
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