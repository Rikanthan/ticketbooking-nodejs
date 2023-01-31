module.exports = mongoose => {
    let schema = mongoose.Schema({
        eventId :{type : String , unique : true},
        eventName : String,
        duration : String,
        venue : String,
        dateTime : Date,
       
    },{
        upsert : true,
        timestamps : true
    });

    schema.method("toJSON", function(){
        const {__v, _id, ...object} = this.toObject();
        object.id = _id;
        return object;
    })

    const Event = mongoose.model(
        "event", schema
    );
    return Event;
}