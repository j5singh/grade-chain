const express = require('express');
const app = express();
const mongoose = require('mongoose')
const user = require('./models/user')
const bcrypt = require('bcrypt')

// MIDDLEWARES
mongoose.connect('mongodb://localhost:27017/grade-chain', {
    useNewUrlParser : true,
    useUnifiedTopology : true,
    useCreateIndex: true
}, () => {
    console.log("Connected to MongoDB")
})

app.use(express.urlencoded({extended: true}));
app.use(express.json()) // To parse the incoming requests with JSON payloads

app.get('/', (req, res) => {
    res.send('Hello from API!');
})

app.post('/api', async (req, res) => {
    res.send({msg: 'Hello from API! You are ' + req.body.name + ' ' + req.body.surname})
});

app.post('/api/login', async (req, res) => {
    const username = req.body.username
    const password = req.body.password
    const digest = await bcrypt.hash(password, 10)
    res.send({'hash' : digest})
});


app.listen(3001, () => console.log('Server Running on port 3001'));