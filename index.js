const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(cors());
const { body } = require('express-validator');
const controller = require('./controller');
const checkIfUser = require('./helper').checkIfUser;
app.use(express.json());
app.use(bodyParser.json());


const connectToMongo = require("./db");
connectToMongo();

app.post('/create-user',[
    body('name','Name must be at least 3 characters').isLength({ min: 3 }),
    body('email','Email must be a valid email').isEmail(),
    body('password','Password must be at least 5 characters').isLength({ min: 5 }),
],controller.createUser);
app.post('/login',controller.login);

app.post('/create-agency-client',checkIfUser,controller.createAgencyAndClient);
app.put('/update-client',checkIfUser,controller.updateClient);
app.get('/get-top-client-for-agency/:agencyId',checkIfUser,controller.getTopClientForAgency);

app.get('/',(req,res)=>{
    res.status(200).send("Hi from server")
})


let port = process.env.PORT;


app.listen(port, () => console.log(`Server listening at port ${port}`));
