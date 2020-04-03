const User = require('../models/Users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require("express-validator")

const registerController = async (req, res) => {

    const { name, email, password } = req.body; 
    check("email", "Enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({
        min: 6
    })
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("we have errrors")
        return res.status(400).json({
            errors: errors.array()
        })
    } 
    try {
        await User.findOne({
            email: email
        }, function(err, userExistance) {
            if (userExistance){
                console.log("user already exists")
                return res.status(400).json({
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
                    }
                    else {
                        console.log('Something went wrong while saving data.');
                        console.log(err);
                        if (err) throw err;
                    }
                
                })
            
                return res.json({ 
                    user: user,
                    token: jwt.sign(user.id, "randomString") 
                })
            }        
        }).exec();
    } catch (err) {
        console.log(err.message)
        res.status(500).send("Error in Saving")
    }
}

const logInController = async (req, res) => {
    const { email, password } = req.body;
    try {
        console.log('abc')
        const user = await User.findOne({
            email
        })
        console.log(user)

        if (!user) {
            throw Error("User not found.");
        }
        console.log('abc')
        console.log(user.password)
        const result = await user.matchPassword(password)
        if (result) {
            const token = jwt.sign( { user }, "yourSecretKey");
            res.json({
                user,
                token,
                message: "User Found Successfully!"
            })
        } 
    } catch (err) {
        console.log('abc2')

        //error: '${err.message}'
        console.log(err.message)

        res.status(500).send("Error in ")
    }

}

module.exports.registerController = registerController 
module.exports.logInController = logInController
