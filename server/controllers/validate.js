const { check, validationResult } = require("express-validator")

const validateEmailAndPassword = () => {
    [
        check("username", "Enter a Valid Username")
        .not()
        .isEmpty,
        check("email", "Enter a valid email").isEmpty(),
        check("password", "Please enter a valid password").isLength({
            min: 6
        })
    ]
}

module.exports.validateEmailAndPassword = validateEmailAndPassword