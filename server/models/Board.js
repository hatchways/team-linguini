const mongoose = require('mongoose');

const BoardSchema = new mongoose.Schema({
    title: String,
    columns: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Column'
        }
    ],
    owner: {
        type: String,//it will be change to ObjectId of user later
        default: ''
    },
    /*owner: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        require: true
    },*/ //I will uncomment this field after the Use module finishes
    createAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Board', BoardSchema);