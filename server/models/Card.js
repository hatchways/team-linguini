const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    deadline: Date,
    tags: [String],
    comments: [String],
    description: String,
    checklist: [ {
        content: String,
        active: Boolean
    }],
    attachment: [ {
            fileName: String,
            url: String
    }],
    colorCode: {
        type: String,
        default: 'green'
    },
    columnId : {
        type: mongoose.Schema.ObjectId,
        require: true
    },
    owner: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        require: true
    }, //I will uncomment this field after the Use module finishes
    createAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Card', CardSchema);