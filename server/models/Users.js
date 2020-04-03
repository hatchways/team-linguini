const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

function setPassword(value) {
    const hashPassowrd = bcryptjs.hashSync(value, 10)
    //console.log(hashPassowrd)
    return hashPassowrd
}

const User = new mongoose.Schema({
    /*name: {
       type: String,
       required: [true, 'is required'],
       maxlength: [50, 'can not be more than 50 characters'],
       minlength: [8, 'can not be less than 8 characters']
    },*/
    password: {
        type: String,
        required: [true, 'is required'],
        maxlength: [60, 'can not be more than 50 characters'],
        minlength: [6, 'can not be less than 8 characters'],
        //select: false,
        set: setPassword
    },
    email: {
        type: String,
        required: [true, 'is required'],
        index: { unique: true },
    }

});

User.pre('save', async function(next) {
    if(!this.isModified('password')){
        next();
    }

    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
    //console.log("inpre save")
    //console.log(this.password)
    next();
})

User.methods.matchPassword = async function(enteredPassword){
    console.log("waiting for saved password")
    console.log(enteredPassword)
    console.log(this.password)
    return await bcryptjs.compare(enteredPassword, this.password);
    /*const userPassword = this.password
    try {
        const result = await bcryptjs.compare(enteredPassword), userPassword;
        return result
    } catch {

    } */
}

module.exports = mongoose.model('User', User); 