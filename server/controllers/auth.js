const User = require('../models/Users');
const jwt = require('jsonwebtoken');
const { validationResult } = require("express-validator")

const registerController = async (req, res, next) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
        return next(err)
    } 

    const { name, email, password } = req.body; 
    try {
        await User.findOne({
            email: email
        }, function(err, userExistance) {
            if (err){
                return next(err)
            } else if (userExistance){
                return next('User Already Exists.')
            } else {
                const user = new User({
                      email,
                      password,
                      name,
                  })
                user.save((err, data) => {
                    if(data) {
                        data.password = undefined
                        return res.json({ 
                            user: data,
                            token: jwt.sign(user.id, "randomString") 
                        })
                    }
                    else {
                        if (err) return next(err);
                    }
                
                })
            }        
        }).exec();
    } catch (err) {
        return next(err)
    }
}

const logInController = async (req, res, next) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
        return next(err)
    } 

    const { email, password } = req.body;
    try {
        const user = await User.findOne({
            email
        })
        if (!user) {
            return next('User Does Not Exists.')
        }
        user.comparePassword(password, function(err, isMatch){
            if (err){
                return next(err)
            } else if (isMatch){
                const token = jwt.sign( { user }, "yourSecretKey");
                user.password = undefined
                res.json({
                    user,
                    token,
                })
            } else {
                return next('Incorrect Password.')
            }
        })

    } catch (err) {
        return next(err)
    }

}

module.exports.registerController = registerController 
module.exports.logInController = logInController
