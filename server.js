const express = require("express");
require("dotenv").config();
const cors = require("cors");
const fs = require("fs");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./Swagger.json');
const customCss = fs.readFileSync((process.cwd()+"/swagger.css"), 'utf8');
const app = express();

const corsOptions = {
    origin: "http://localhost:3000"
}

app.use(cors(corsOptions));

app.use(express.json())

app.use(express.urlencoded({extended: true}))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {customCss}));

app.get("/",(req,res) =>{
    res.json({message : "server started successfully!"})
})

require("./app/routes/user.routes")(app);

require("./app/routes/ticket.routes")(app);

require("./app/routes/event.routes")(app);

const PORT = process.env.PORT || 8080;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})

const db = require("./app/models");

db.mongoose.connect(db.url,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>{
    console.log("connected to database!")
    console.log(process.env.JWT_SECRET_KEY)
}).catch(err =>{
    console.log("Cannot connect to the database!", err);
    process.exit();
})

