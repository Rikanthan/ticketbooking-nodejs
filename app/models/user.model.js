module.exports = mongoose =>{
    let schema = mongoose.Schema({
        userId: {type : String, unique: true},
        username : {type : String,unique: true},
        userEmail : {type : String,unique: true},
        password : {type: String}
    });

    schema.method("toJSON", function(){
        const {__v, _id, ...object} = this.toObject();
        object.id = _id;
        return object;
    })

    const User = mongoose.model(
        "user", schema
    );

    return User;

}