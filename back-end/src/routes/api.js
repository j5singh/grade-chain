const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config();

// IMPORT MODELS
const User = require('../models/user')
const Course = require('../models/course')
const Grade = require('../models/grade')

// We are inside /api
router.post('/', async (req, res) => {
    res.send({msg: 'Hello from API! You are ' + (req.body.name || 'pippo') + ' ' + (req.body.surname || 'pluto')})
});

// Register route
router.post('/register', async (req, res) => {
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

// Login route
router.post('/login', async (req, res) => {
    const password = req.body.password
    const email = req.body.email

    // Could add .lean() at the end if you don't want the default values
    const response = await User.findOne({email: email})

    if (!response) {
        return res.send({ result_msg: "The inserted credentials do not seem to match any record on our database!", status: "ERROR", result_data: {} })
    }

    const token = jwt.sign({
        email: response.email
    }, process.env.JWT_SECRET, { expiresIn: '1d' })

    if (await bcrypt.compare(password, response.password)) {
        await User.findByIdAndUpdate(response._id, { token: token })
        response.token = token
        return res.send({ result_msg: "OK", status: "SUCCESS", result_data: response })
    }
    // If you reach till here, it means that the email is found in the records but the password is incorrect
    return res.send({ result_msg: "Invalid password!", status: "ERROR", result_data: {} })
});

// Verify token route
router.post('/verifytoken', async (req, res) => {
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

// Take all courses
router.post('/courses', async (req, res) => {
    const response = await Course.find({}) 

    if (!response) {
        return res.send({ result_msg: "There was an error getting the courses!", status: "ERROR", result_data: {} })
    }

    return res.send({ result_msg: "OK", status: "SUCCESS", result_data: response })
})

// Take grades of a student by his serial number
router.post('/studentGrades', async (req, res) => {
    const serialNumber = req.body.serialNumber

    const response = await Grade.find({ "transaction.student" : serialNumber}) 

    if (!response) {
        return res.send({ result_msg: "There was an error getting the grades!", status: "ERROR", result_data: {} })
    }

    // if the response was good we'll add all the information needed to the exams
    for (var grade of response) {
        var responseGrade = await Course.findOne({ "courseCode" : grade.transaction.courseCode })

        if (!responseGrade) {
            return res.send({ result_msg: "There was an error getting the course info for ".concat(grade.courseCode).concat("!"), status: "ERROR", result_data: {} })
        }

        grade.transaction.year = responseGrade.year
        grade.transaction.courseName = responseGrade.courseName
        grade.transaction.cfu = responseGrade.CFU

    }

    return res.send({ result_msg: "OK", status: "SUCCESS", result_data: response })
})

module.exports = router