const express = require("express");
const router = express.Router();
const { registerController, logInController, confirmThatisAuthorizedWorks } = require('../controllers/auth.js');
const { isAuthenticated } = require('../middlewares/authorization');
const { check } = require("express-validator");


router.post("/register", [
    check('email', "Enter a valid email.").isEmail(),
    check('password', " Password should be at least 8 characters long.").isLength({ min: 8 })
    ], registerController);
  
router.post("/login", [
    check('email', "Enter a valid email.").isEmail(),
    check('password', " Password should be at least 8 characters long.").isLength({ min: 8 })
    ], logInController);

// router.get("/api/v1/auth/tokenVerifier", isAuthenticated, confirmThatisAuthorizedWorks);

module.exports = router;