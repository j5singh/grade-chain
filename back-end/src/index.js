const express = require('express');
const app = express();

app.get('/api', (req, res) => {
    console.log(req.query)
    res.send('Hello from API! You are ' + req.query.name + ' ' + req.query.surname)
});
app.listen(3001, () => console.log('Server Running on port 3001'));