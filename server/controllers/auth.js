const User = require('../models/Users');
const jwt = require('jsonwebtoken');
const { validationResult } = require("express-validator")

const registerController = async (req, res) => {
     const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    } 

    const { name, email, password } = req.body; 

    try {
        await User.findOne({
            email: email
        }, function(err, userExistance) {
            if (userExistance){
                console.log("user already exists")
                return res.status(401).json({
                    message: "User Already Exists."
                });
            } else {
                console.log('no user exists')
                const user = new User({
                      email,
                      password,
                      name,
                  })
                  
                user.save((err, data) => {
                    console.log('Analyzing Data...');
                    if(data) {
                        console.log('Your data has been successfully saved.');
                        data.password = undefined
                        return res.json({ 
                            user: data,
                            token: jwt.sign(user.id, "randomString") 
                        })
                    }
                    else {
                        console.log('Something went wrong while saving data.');
                        console.log(err);
                        if (err) throw err;
                    }
                
                })
                

            }        
        }).exec();
    } catch (err) {
        console.log(err.message)
        res.status(500).send("Error in Saving")
    }
}

const logInController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    } 

    const { email, password } = req.body;

    try {

        const user = await User.findOne({
            email
        })

        if (!user) {
            return res.status(401).json({
                message: "User Not Found."
            });
        }

        user.comparePassword(password, function(err, isMatch){
            if (isMatch){
                const token = jwt.sign( { user }, "yourSecretKey");
                user.password = undefined
                res.json({
                    user,
                    token,
                })
            } else {
                return res.status(401).json({
                    message: "Password do not match."
                });
            }
        })

    } catch (err) {
        console.log(err.message)
        res.status(500).json({
            message:"Server Side Error."
        });
    }

}

module.exports.registerController = registerController 
module.exports.logInController = logInController
