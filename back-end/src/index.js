// IMPORTING REQUIRED LIBRARIES
const express = require('express');
const app = express();
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
require('dotenv').config();

//IMPORT MODELS
const User = require('./models/user')

// Connecting to the MongoDB database
mongoose
    .connect(process.env.DATABASE_URL, {
        useNewUrlParser : true,
        useUnifiedTopology : true
    })
    .then((db) => console.log("Connected successfully to MongoDB"))
    .catch((err) => console.log("Connection to MongoDB refused: ", err.message))

app.use(express.urlencoded({extended: true}));
app.use(express.json()) // To parse the incoming requests with JSON payloads

app.get('/', (req, res) => {
    res.send('Hello from API!');
})

app.post('/api', async (req, res) => {
    res.send({msg: 'Hello from API! You are ' + req.body.name + ' ' + req.body.surname})
});

app.post('/api/login', async (req, res) => {
    const password = req.body.password
    const email = req.body.email

    // Could add .lean() at the end if you don't want the default values
    const response = await User.findOne({email: email})

    if (!response) {
        return res.send({ result_msg: "The inserted credentials do not seem to match any record on our database!", status: "ERROR", result_data: {} })
    }

    if (await bcrypt.compare(password, response.password)) {
        return res.send({ result_msg: "OK", status: "SUCCESS", result_data: response })
    }
    // If you reach till here, it means that the email is found in the records but the password is incorrect
    return res.send({ result_msg: "Invalid password!", status: "ERROR", result_data: {} })
});


app.listen(process.env.PORT, () => console.log(`Server Running on: http://localhost:${process.env.PORT}`));