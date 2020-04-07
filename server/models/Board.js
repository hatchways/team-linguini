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
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        require: true
    },

    createAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Board', BoardSchema);