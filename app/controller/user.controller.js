const db = require("../models");
const bcrypt = require("bcrypt")
const User = db.users;

exports.create = (req, res) => {
    if (!req.body.username) {
        res.status(400).send({ message: "Username can not be empty" })
    }
    hashPassword(req.body.password)
    function hashPassword(plaintextPassword) {
        bcrypt.hash(plaintextPassword, 10)
            .then(hash => {
                const user = new User({
                    userId: req.body.userId,
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
    let condition = username ? { username: { $regex: new RegExp(username), $options: "i" } } : {};
    User.find(condition)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Tutorial with username " + username });
        else {         
            bcrypt.compare(password, data[0].password, function(err, response) {
                if(response){
                    res.send(data)
                }else{
                    res.status(404).send({message: "password doesn't match "+ data.password+" "+ data.username})
                }
            });
        }
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Tutorial with username=" + username });
      });
  };