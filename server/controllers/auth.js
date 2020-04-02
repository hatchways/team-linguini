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
        return res.status(400).json({
            errors: errors.array()
        })
    }
    try {
        /*User.findOne({
            //'email': req.body.email
            email
        }, function(err, userExistance) {
            if (err){
                console.log(err)
            }
            console.log(userExistance)
            if (userExistance){
                return res.status(400).json({
                message: "User Already Exists."
                });
            }        
        });*/
 
      const user = new User({
          email,
          password,
          name
      })

      const payload = {
          user: {
              id: user.id
          }
      }

      jwt.sign(payload, "randomString", {
          expiresIn: "24h"
      },
      (err, token) => {
          if (err) throw err;
          res.status(200).json({
              token
          });
      })
    
      res.status(200).json({
        user,
        message: "Created User Successfuly!"
        });
    } catch (err) {
        console.log(err.message)
        res.status(500).send("Error in Saving")
    }
}

const logInController = async (req, res) => {
    const { email, password } = req.body;
    //Question @Aecio is this the best find? Cases like duplicates should we worry about?
    try {
        console.log('abc')
        const user = await User.findOne({
            email
        })
        console.log('abc')

        if (!user) {
            throw Error("User not found.");
        }
        console.log('abc')

        if (bcrypt.compareSync(password,user.password)) {
            const token = jwt.sign( { user }, "yourSecretKey", { 
                //Question @Team-Linguinig: For how long do we want the token to last?
                expiresIn: "24h"
            });
            res.json({
                user,
                token,
                message: "User Found Successfully!"
            })
        }
    } catch (err) {
        console.log('abc2')

        error: '${err.message}'
        res.status(500).send("Error in ")
    }

}

module.exports.registerController = registerController 
module.exports.logInController = logInController
