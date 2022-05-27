// IMPORTING REQUIRED LIBRARIES
const express = require('express');
const app = express();
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
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

app.post('/api/register', async (req, res) => {
    const name = req.body.name
    const surname = req.body.surname
    const email = req.body.email
    const password = req.body.password
    const cryptedPass = await bcrypt.hash(password, 10)

    // Could add .lean() at the end if you don't want the default values
    const response = await User.findOne({email: email})

    if (response) {
        return res.send({ result_msg: "The inserted credentials seem to be already registered inside our database!", status: "ERROR", result_data: {} })
    }

    try {
        creation = await User.create({
            name: name, 
            surname: surname,
            email: email,
            password: cryptedPass
        })
    } catch (error) {
        return res.send({ result_msg: error.message, status: "ERROR", result_data: {} })
    }

    // If you reach till here, it means that the email is found in the records but the password is incorrect
    return res.send({ result_msg: "Successfully created!", status: "SUCCESS", result_data: {} })
});

app.post('/api/login', async (req, res) => {
    const password = req.body.password
    const email = req.body.email

    // Could add .lean() at the end if you don't want the default values
    const response = await User.findOne({email: email})

    if (!response) {
        return res.send({ result_msg: "The inserted credentials do not seem to match any record on our database!", status: "ERROR", result_data: {} })
    }

    const token = jwt.sign({ 
        email: response.email
    }, process.env.JWT_SECRET, { expiresIn: 60 })

    if (await bcrypt.compare(password, response.password)) {
        await User.findByIdAndUpdate(response._id, { token: token })
        return res.send({ result_msg: "OK", status: "SUCCESS", result_data: {token: token} })
    }
    // If you reach till here, it means that the email is found in the records but the password is incorrect
    return res.send({ result_msg: "Invalid password!", status: "ERROR", result_data: {} })
});

app.post('/api/verifytoken', async (req, res) => {
    const token = req.body.token

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        return res.send({ result_msg: "Token Expired!", status: "ERROR", result_data: {} })
    }

    const response = await User.findOne({ token: token }) 

    if (!response) {
        return res.send({ result_msg: "The inserted credentials do not seem to match any record on our database!", status: "ERROR", result_data: {} })
    }

    return res.send({ result_msg: "OK", status: "SUCCESS", result_data: response })

})


app.listen(process.env.PORT, () => console.log(`Server Running on: http://localhost:${process.env.PORT}`));