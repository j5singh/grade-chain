const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config();

// IMPORT MODELS
const User = require('../models/user')
const Course = require('../models/course')
const Grade = require('../models/grade')
const PendingGrade = require('../models/pending_grade')
const Exam = require('../models/exam')

const { subtle } = require('node:crypto').webcrypto;

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
router.post('/studentgrades', async (req, res) => {
    const serialNumber = req.body.serialNumber

    const response = await Grade.find({ "transaction.student" : serialNumber}).sort({ "transaction.date" : -1})

    if (!response) {
        return res.send({ result_msg: "There was an error getting the grades!", status: "ERROR", result_data: {} })
    }

    // if the response was good we'll add all the information needed to the exams
    for (var grade of response) {
        var responseGrade = await Course.findOne({ "courseCode" : grade.transaction.courseCode })

        if (!responseGrade) {
            return res.send({ result_msg: "There was an error getting the course info for ".concat(grade.courseCode).concat("!"), status: "ERROR", result_data: {} })
        }

        var date = new Date((grade.transaction.date * 1e3) + 7200*1e3).toISOString().slice(0, 10)

        grade.transaction.date = date
        grade.transaction.year = responseGrade.year
        grade.transaction.courseName = responseGrade.courseName
        grade.transaction.cfu = responseGrade.CFU

    }

    return res.send({ result_msg: "OK", status: "SUCCESS", result_data: response })
})

// Take pending grades of a student by his serial number
router.post('/gradespending', async (req, res) => {
    const serialNumber = req.body.serialNumber

    const response = await PendingGrade.find({ "transaction.student" : serialNumber}).sort({ "transaction.date" : -1})

    if (!response) {
        return res.send({ result_msg: "There was an error getting the pending grades!", status: "ERROR", result_data: {} })
    }

    // if the response was good we'll add all the information needed to the exams
    for (var pendingGrade of response) {
        var responsePendingGrade = await Course.findOne({ "courseCode" : pendingGrade.transaction.courseCode })

        if (!responsePendingGrade) {
            return res.send({ result_msg: "There was an error getting the course info for ".concat(responsePendingGrade.courseCode).concat("!"), status: "ERROR", result_data: {} })
        }

        pendingGrade.transaction.year = responsePendingGrade.year
        pendingGrade.transaction.courseName = responsePendingGrade.courseName
        pendingGrade.transaction.cfu = responsePendingGrade.CFU
    }

    return res.send({ result_msg: "OK", status: "SUCCESS", result_data: response })
})

// Register a new grade
router.post('/registergrade', async (req, res) => {
    const digest = req.body.digest
    const previousHash = req.body.previousHash
    const timestamp = req.body.timestamp
    const pendingGrade = req.body.pendingGrade

    const response = await Grade.findOne({"transaction.student": pendingGrade.transaction.student, "transaction.courseCode": pendingGrade.transaction.courseCode})

    if (response) {
        await PendingGrade.deleteOne({ _id: pendingGrade._id })

        return res.send({ result_msg: "Student already passed this exam!", status: "ERROR", result_data: {} })
    }

    try {
        const responseCheck = await Grade.findOne({},{"_id":0, "hash": 1}).sort({"timestamp": -1}).limit(1)

        if (!responseCheck) {
            return res.send({ result_msg: "No last block found!", status: "ERROR", result_data: {} })
        }
    
        if (responseCheck.hash == previousHash) {
            creation = await Grade.create({
                hash: digest, 
                previousHash: previousHash,
                timestamp: timestamp,
                nonce: pendingGrade.nonce,
                merkleRoot: pendingGrade.merkleRoot,
                transaction: {
                    courseCode: pendingGrade.transaction.courseCode,
                    teacher: pendingGrade.transaction.teacher,
                    teacherCode: pendingGrade.transaction.teacherCode,
                    student: pendingGrade.transaction.student,
                    result: pendingGrade.transaction.result,
                    date: pendingGrade.transaction.date
                }
            })

            if(creation) {
                const del = await PendingGrade.deleteOne({ _id: pendingGrade._id })
                if (del.acknowledged) {
                    return res.send({ result_msg: "Successfully created!", status: "SUCCESS", result_data: {} })
                }
            } else {
                return res.send({ result_msg: "Block wasn't created!", status: "ERROR", result_data: {} })
            }
        } else {
            return res.send({ result_msg: "Previous Hash mismatch!", status: "ERROR", result_data: {} })
        }
    } catch (error) {
        return res.send({ result_msg: error.message, status: "ERROR", result_data: {} })
    }
});

// get the hash of the last block of the chain
router.post('/lasthash', async (req, res) => {

    const response = await Grade.findOne({},{"_id":0, "hash": 1}).sort({"timestamp": -1}).limit(1)

    if (!response) {
        return res.send({ result_msg: "No last block found!", status: "ERROR", result_data: {} })
    }

    return res.send({ result_msg: "Found last block!", status: "SUCCESS", result_data: response })
});

// create pending
router.post('/createpending', async (req, res) => {
    const courseCode = req.body.courseCode
    const teacher = req.body.teacher
    const teacherCode = req.body.teacherCode
    const studentsResults = req.body.studentResults // [{ "student": "305784", "result": 28}, { "student": "305884", "result": 29}]
    const date = req.body.date
    var errorList = []

    const nonce = Math.floor(100000 + Math.random() * 900000)
    const unixDate = parseInt((new Date(date).getTime() / 1000).toFixed(0))

    // for every result to be created
    for (var studRes of studentsResults) {
        var transactionObj = {
            courseCode: courseCode,
            teacher: teacher,
            teacherCode: teacherCode,
            student: studRes.student,
            result: studRes.result,
            date: unixDate
        }

        var text = '{ courseCode: ' + String(courseCode) + ', teacher: ' + String(teacher) +
            ', teacherCode: ' + String(teacherCode) + ', student: ' + String(studRes.student) +
            ', result: ' + String(studRes.result) + ', date: ' + String(unixDate) + ' }'

        const encoder = new TextEncoder();
        const toHash = encoder.encode(text)
        const hash = await subtle.digest('SHA-256', toHash);
        const hashArray = Array.from(new Uint8Array(hash));
        const merkleRoot = hashArray
            .map((bytes) => bytes.toString(16).padStart(2, '0'))
            .join('');

        creation = await PendingGrade.create({
            nonce: nonce,
            merkleRoot: merkleRoot,
            transaction: transactionObj
        })

        if(!creation) {
            errorList.push({courseCode: courseCode, student: studRes.student})
        }
    }

    if(errorList.length > 0) {
        res.send({ result_msg: "There was an error creating a block!", status: "ERROR", result_data: {errorList} })
    }

    res.send({ result_msg: "Pending blocks created!", status: "SUCCESS", result_data: {} })
});


// delete pending grade
router.post('/deletepending', async (req, res) => {
    const pendingGrade = req.body.pendingGrade

    const del = await PendingGrade.deleteOne({ _id: pendingGrade._id })

    if (del.acknowledged) {
        return res.send({ result_msg: "Successfully declined!", status: "SUCCESS", result_data: {} })
    }

    return res.send({ result_msg: "Result declination didn't succeed!", status: "ERROR", result_data: response })
});

// get all courses a professor teaches
router.post('/teachingcourses', async (req, res) => {
    const teacherCode = req.body.teacherCode

    const response = await Course.find({ "teacher.teacherCode": teacherCode })

    if (!response) {
        return res.send({ result_msg: "No course was found", status: "ERROR", result_data: {} })
    }

    return res.send({ result_msg: "Courses found!", status: "SUCCESS", result_data: response })
});

// create a new exam
router.post('/createexam', async (req, res) => {
    const bookOpening = req.body.bookOpening // Unix Timestamp
    const bookClosing = req.body.bookClosing // Unix Timestamp
    const teacherCode = req.body.teacherCode
    const teacher = req.body.teacher
    const courseCode = req.body.courseCode
    const courseName = req.body.courseName
    const examDate = req.body.examDate // Unix Timestamp

    const creation = await Exam.create({
        bookingOpening: bookOpening,
        bookingClosing: bookClosing,
        teacherCode: teacherCode,
        teacher: teacher,
        courseCode: courseCode,
        courseName: courseName,
        examDate: examDate
    })

    if(creation) {
        return res.send({ result_msg: "Successfully created!", status: "SUCCESS", result_data: {} })
    } else {
        return res.send({ result_msg: "Block wasn't created!", status: "ERROR", result_data: {} })
    }
});

// get exams that are open to subscription, the student can now subscribe
router.post('/opensubscriptions', async (req, res) => {
    const teacherCode = req.body.teacherCode

    // bisogna trovare tutti gli esami che hanno iscrizioni aperte, quindi in cui
    // la data di oggi è maggiore della data di apertura dell'esame stesso ma minore
    // della data di iscrizione, per ogni risultato bisogna controllare se lo studente 
    // ha già passato quell'esame oppure se c'è un risultato pending per quell'esame, 
    // se una delle due possibilità si verifica lo studente non si può prenotare

    return res.send({ result_msg: "Exams found!", status: "SUCCESS", result_data: response })
});

// get exams that can be registered, you can now assign grades to the students registered to them
router.post('/finishedexams', async (req, res) => {
    const teacherCode = req.body.teacherCode
    const todayDate = parseInt((new Date().getTime() / 1000).toFixed(0))

    const response = await Exam.find({ teacherCode: teacherCode, examDate: {$lt: todayDate} })

    if (!response) {
        return res.send({ result_msg: "No exam was found", status: "ERROR", result_data: {} })
    }

    return res.send({ result_msg: "Exams found!", status: "SUCCESS", result_data: response })
});

module.exports = router