const express = require('express');
const app = express();
const mongoose = require('mongoose')
const User = require('./models/user')
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
    const password = req.body.password
    const email = req.body.email
    const response = await User.findOne({ email: email }, function (err, impacts) {
        res.send(impacts)
    } )

    // try {
    //     const response = await User.find({})
    //     res.send(response)

    //     if(bcrypt.compare(password, response.password)) {
    //         res.send(response)
    //         console.log('Ritorno della query ', response)
    //     }
    // } catch(err) {
    //     console.log(err)
    //     return res.json({ status : err})
    // }
});


app.listen(3001, () => console.log('Server Running on port 3001'));