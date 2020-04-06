const express = require("express");
const router = express.Router();
const { registerController, logInController, confirmThatisAuthorizedWorks } = require('../controllers/auth.js');
const { isAuthorized } = require('../middlewares/authorization');
const { check } = require("express-validator");


router.post("/api/v1/auth/register", [   
    check('email', "Enter a valid email.").isEmail(),
    check('password', " Password should be at least 8 characters long.").isLength({ min: 8 })
    ], registerController);
  
router.post("/api/v1/auth/login", [   
    check('email', "Enter a valid email.").isEmail(),
    check('password', " Password should be at least 8 characters long.").isLength({ min: 8 })
    ], logInController);

router.get("/api/v1/auth/tokenVerifier", isAuthorized, confirmThatisAuthorizedWorks);

module.exports = router;