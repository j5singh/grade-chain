// IMPORTING REQUIRED LIBRARIES
const express = require('express');
const app = express();
const mongoose = require('mongoose')
require('dotenv').config();

// IMPORT MODELS
const api = require('./routes/api')

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

// ROUTES
app.get('/', (req, res) => {
    res.send('Hello from the grade-chain backend! Server is set up successfully');
})

app.use('/api', api);

app.listen(process.env.PORT, () => console.log(`Server Running on: http://localhost:${process.env.PORT}`));