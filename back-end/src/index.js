const express = require('express');
const app = express();

// MIDDLEWARES
app.use(express.urlencoded({extended: true}));
app.use(express.json()) // To parse the incoming requests with JSON payloads

app.get('/', (req, res) => {
    res.send('Hello from API!');
})

app.post('/api', (req, res) => {
    res.send({msg: 'Hello from API! You are ' + req.body.name + ' ' + req.body.surname})
});

app.listen(3001, () => console.log('Server Running on port 3001'));