
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
/*const jwt = require('jsonwebtoken');
const crypto = require('crypto');*/

const User = new mongoose.Schema({
    name: {
       type: String,
       required: [true, 'is required'],
       unique: true,
       maxlength: [50, 'can not be more than 50 characters'],
       minlength: [8, 'can not be less than 8 characters']
    },
    password: {
        type: String,
        required: [true, 'is required'],
        maxlength: [50, 'can not be more than 50 characters'],
        minlength: [6, 'can not be less than 8 characters'],
        select: false
    },
    email: {
        type: String,
        required: [true, 'is required'],
        unique: true,
        match: [/^\S+@\S+\.\S+/, 'Please add a valid email']
    }
});

User.pre('save', async function(next) {
    if(!this.isModified('password')){
        next();
    }

    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
})

User.methods.matchPassword = async function(enteredPassword){
    return await bcryptjs.compare(enteredPassword), this.password;
}

module.exports = mongoose.model('User', UserSchema); 