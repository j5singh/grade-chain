const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    res.send({msg: 'You are in /api/auth'})
})

router.post('/login', (req, res) => {
    res.send({msg: 'You are in /api/auth/login'})
})

module.exports = router;