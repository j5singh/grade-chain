const mongoose = require('mongoose');
const { Schema } = mongoose;

var validateHash = function(digest) {
    var re = /^[a-f0-9]{64}$/gi;
    return re.test(digest)
};

const PendingGradeSchema = new Schema({
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
}, {collection: 'pending_grades'});

const model = mongoose.model('PendingGradeSchema', PendingGradeSchema)

module.exports = model