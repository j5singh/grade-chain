const mongoose = require('mongoose');
const { Schema } = mongoose;

var validateHash = function(digest) {
    var re = /^[a-f0-9]{64}$/gi;
    return re.test(digest)
};

var validateUnixTimeStamp = function(unixDate) {
    // convert to UTC + 1 ( - 7200 * 1e3 )
    var date = new Date((unixDate * 1e3) + 7200*1e3).toISOString().slice(-13, -5)
    var re = /(?:[01]\d|2[0123]):(?:[012345]\d):(?:[012345]\d)/;
    return re.test(date)
};

const GradeSchema = new Schema({
    hash: {
        type: String,
        required: true,
        unique: true,
        validate: [validateHash, 'Please fill a valid digest']
    },
    previousHash: {
        type: String,
        required: true,
        validate: [validateHash, 'Please fill a valid digest']
    },
    timestamp: {
        type: Number,
        required: true,
        validate: [validateUnixTimeStamp, 'Please fill a Unix TimeStamp']
    },
    nonce: {
        type: Number,
        required: true
    },
    merkleRoot: {
        type: String,
        required: true,
        validate: [validateHash, 'Please fill a valid digest'],
    },
    transaction: {
        type: Object,
        required: true
    }
}, {collection: 'grades'});

const model = mongoose.model('GradeSchema', GradeSchema)

module.exports = model