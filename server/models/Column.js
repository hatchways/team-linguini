const mongoose = require('mongoose');

const ColumnSchema = new mongoose.Schema({
    title: String,

    cards: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Card'
        }
    ],

    boardId: {
        type: mongoose.Schema.ObjectId,
        require: true
    },

    orderOnBoard: Number, //order of the column in the belonged board.

    owner: {
        type: String,
        default: ''
    },
    /*owner: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        default: ''
    },*/ //I will uncomment this field after the User module finishes

    createAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Column', ColumnSchema);