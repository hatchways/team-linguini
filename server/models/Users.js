const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

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
        minlength: [8, 'can not be less than 8 characters'],
        trim: true,
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
    next();
})


/* @desc: Determines if the document's current password matches the passed password
 * utilized in functions verify user's identity i.e. log-in. 
 * @param: string
 * @returns: object
*/
User.methods.comparePassword = function(enteredPassword, result){

    bcryptjs.compare(enteredPassword, this.password, function(err, isMatch) {
        if (err) {
         console.log(err)   
            return result(err);
        }
        console.log(isMatch)
        result(null, isMatch);
    });
}



module.exports = mongoose.model('User', User); 