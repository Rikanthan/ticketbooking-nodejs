const dbConfig = require("../config/db.config.js")

const mongoose = require("mongoose")

mongoose.set('strictQuery',false);
mongoose.Promise = global.Promise;

const db = {}
db.mongoose = mongoose
db.url = dbConfig.url;
db.users = require("./user.model")(mongoose);
db.tickets = require("./ticket.model")(mongoose);
db.events = require("./event.model")(mongoose);

module.exports = db;