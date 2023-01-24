const db = require("../models");
const User = db.users;

exports.create = (req,res) => {
    if(!req.body.username){
        res.status(400).send({message: "Username can not be empty"})
    }

    const user = new User({
        userId : req.body.userId,
        username : req.body.username,
        userEmail : req.body.userEmail,
        password : req.body.password
    });

    user
    .save(user)
    .then(data => {
        res.send(data)
    })
    .catch(error => {
        res.status(500).send({
            message: error.message || "Something went wrong during user creation"
        });
    })
}