module.exports = mongoose =>{
    let schema = mongoose.Schema(
        {
            bookingId : String,
            userId : String,
            noOfTickets: int,
            ticketId : Array
        }
    )

    schema.method("toJSON", function(){
        const {__v,_id,...object} = this.toObject();
        object.id = _id;
        return object;
    })

    const Booking = mongoose.model(
        "booking", schema
    )

    return Booking;
}