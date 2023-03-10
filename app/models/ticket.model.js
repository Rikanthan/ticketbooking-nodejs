module.exports = mongoose => {
    let schema = mongoose.Schema({
        ticketNo :{type : String , unique : true},
        eventId: String,
        userId : {type: String, default: ""},
        isBooked : {type : Boolean, default: false}
       
    },{
        upsert : true,
        timestamps : true
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