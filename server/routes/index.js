const express = require("express");
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');
const { registerController, logInController } = require('../controllers/auth.js')
const { check, validationResult } = require("express-validator")

//const { validateEmailAndPassword } = require('../controllers/validate')
const router = express.Router();

router.get("/welcome", function(req, res, next) {
  res.status(200).send({ welcomeMessage: "Step 1 (completed)" });
});

router.post("/register",[
  check("email", "Enter a valid email").isEmail(),
  check("password", "Please enter a valid password").isLength({
      min: 6
  })
], registerController);
module.exports = router;

router.post("/login",[
  check("email", "Enter a valid email").isEmpty(),
  check("password", "Please enter a valid password").isLength({
      min: 6
  })
], logInController)