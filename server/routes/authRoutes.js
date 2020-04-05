const express = require("express");
const router = express.Router();
const { registerController, logInController } = require('../controllers/auth.js');
const { check } = require("express-validator");


router.post("/api/v1/auth/register", [   
    check('email', "Enter a valid email.").isEmail(),
    check('password', " Password should be at least 8 characters long.").isLength({ min: 8 })
    ], registerController);
  
router.post("/api/v1/auth/login", [   
    check('email', "Enter a valid email.").isEmail(),
    check('password', " Password should be at least 8 characters long.").isLength({ min: 8 })
    ], logInController);

    module.exports = router;