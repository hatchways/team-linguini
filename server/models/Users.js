const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

/* @desc: The User schema. It currently only contains/requires a password and email field.
 * @indexes: Only one index exists for the model, email (denoted by <index: { unique: true }>)
 * this index must stay in place in order to query for users in mongodb. 
*/ 
const User = new mongoose.Schema({
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
    },
    selectedBoard: {
        type: mongoose.Schema.ObjectId,
        ref: 'Board'
    },
    boards: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Board'
        }
    ],
    createAt: {
        type: Date,
        default: Date.now()
    }
});

/* @desc: Before saving the user instance/document the password is hashed. 
 * @param: next
 * @returns: none
*/
User.pre('save', async function(next) {
    if(!this.isModified('password')){
        next();
    }

    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
    next();
})


/* @desc: Determines if the document's current password matches the passed password
 * utilized in functions to verify user's identity i.e. log-in. 
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