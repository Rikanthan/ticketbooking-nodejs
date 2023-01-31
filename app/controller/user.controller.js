const db = require("../models");
const bcrypt = require("bcrypt")
const User = db.users;

exports.create = (req, res) => {
    const validEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    const validPassword=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    let isValid = true;
    if (!req.body.username) {
        res.status(400).send({ message: "Username can not be empty" })
        isValid = false;
    }
    if(!validEmail.test(req.body.userEmail)){
        res.status(400).send({message : "User email is not valid"})
        isValid = false;
    }
    if(!validPassword.test(req.body.password)){
        res.status(400).send({message : "User password is not valid"})
        isValid = false;
    }
    if(isValid){
        hashPassword(req.body.password)
    }
    function hashPassword(plaintextPassword) {
        bcrypt.hash(plaintextPassword, 10)
            .then(hash => {
                const user = new User({
                    username: req.body.username,
                    userEmail: req.body.userEmail,
                    password: hash
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
            }).catch(error => {
                return error
            })
    }
}

exports.findOne = (req, res) => {
    const username = req.query.username;
    const password = req.query.password;
    let condition = username ? { username: username } : {};
    User.find(condition)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "No user with username " + username });
        else {         
            bcrypt.compare(password, data[0].password, function(err, response) {
                if(response){
                    res.send(data)
                }else{
                    res.status(404).send({message: "password doesn't match "})
                }
            });
        }
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving user with username=" + username });
      });
  };