const mongoose = require('mongoose');
const { Schema } = mongoose;

var validateHash = function(digest) {
    var re = /^[a-f0-9]{64}$/gi;
    return re.test(digest)
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
}, {collection: 'grades'}, {versionKey: false});

const model = mongoose.model('GradeSchema', GradeSchema)

module.exports = model