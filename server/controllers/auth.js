const User = require('../models/Users');
const { ErrorResponse, errorFormater } = require('../utils/errorResponse');
const jwt = require('jsonwebtoken');
const { validationResult } = require("express-validator")

/* @desc: registerController takes a request and validates email and password.
 * As well, determines if user already exists via email and if one does not exists
 * a new user document is created and returned within a JSON object without 
 * the password along with a JWT.
 * @param: req, res, next
 * @returns: none
*/

module.exports.registerController = async (req, res, next) => {
    const err = validationResult(req).formatWith(errorFormater);
    if (!err.isEmpty()) {
        const error = new ErrorResponse(err.array(), 401);
        return next(error);
    } 

    const { name, email, password } = req.body; 
    try {
        await User.findOne({
            email: email
        }, function(err, userExistance) {
            if (err){
                const error = new ErrorResponse("Error in database finding user.", 500);
                return next(error);            
            } else if (userExistance){
                const error = new ErrorResponse("User Already Exists.", 403);
                return next(error);
            } else {
                const user = new User({
                      email,
                      password,
                      name,
                  })
                user.save((err, data) => {
                    if (err){
                        const error = new ErrorResponse("Error in database saving user.", 401);
                        return next(error);
                    } else if(data) {
                        data.password = undefined
                        return res.json({ 
                            user: data,
                            token: jwt.sign(user.id, "randomString") 
                        })
                    }
                })
            }        
        }).exec();
    } catch (err) {
        return next(err)
    }
}

/* @desc: logInController takes a request and validates email and password.
 * As well, determines if user already exists via email and if one does exists
 * the retrieved user document's password is compared to the request's password. 
 * If the passwords match the response object is modified with a JSON object that contains
 * a JWT and the retrieved user document without a password. 
 * @param: req, res, next
 * @returns: none
*/
module.exports.logInController = async (req, res, next) => {
    const err = validationResult(req).formatWith(errorFormater);
    if (!err.isEmpty()) {
        const error = new ErrorResponse(err.array(), 401);
        return next(error);
    } 

    const { email, password } = req.body;
    try {
        const user = await User.findOne({
            email
        })
        if (!user) {
            const error = new ErrorResponse("User does not exist.", 401);
            return next(error);
        }
        user.comparePassword(password, function(err, isMatch){
            if (err){
                const error = new ErrorResponse("Unable to compare password.", 500);
                return next(error);
            } else if (isMatch){
                const token = jwt.sign( { user }, "yourSecretKey");
                user.password = undefined
                res.json({
                    user,
                    token,
                })
            } else {
                const error = new ErrorResponse("Incorrect password.", 403);
                return next(error);            }
        })

    } catch (err) {
        return next(err)
    }

}

