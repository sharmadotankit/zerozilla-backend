const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(cors());
const { body } = require('express-validator');
const controller = require('./controller');


const connectToMongo = require("./db");
connectToMongo();

app.post('/create-user',[
    body('name','Name must be at least 3 characters').isLength({ min: 3 }),
    body('email','Email must be a valid email').isEmail(),
    body('password','Password must be at least 5 characters').isLength({ min: 5 }),
],controller.createUser);

app.post('create-agency-client',controller.createAgencyAndClient);
app.put('update-client',controller.updateClient);
app.get('/get-top-client-for-agency',controller.getTopClientForAgency);



let port = process.env.PORT;


app.listen(port, () => console.log(`Server listening at port ${port}`));
