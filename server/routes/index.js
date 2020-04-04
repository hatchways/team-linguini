const express = require("express");
const { registerController, logInController } = require('../controllers/auth.js')
const { check } = require("express-validator")
const router = express.Router();

router.get("/welcome", function(req, res, next) {
  res.status(200).send({ welcomeMessage: "Step 1 (completed)" });
});

router.post("/api/v1/auth/register", [   
  check('email', "Enter a valid email.").isEmail(),
  check('password', "Password should be at least 8 characters long.").isLength({ min: 8 })
  ], registerController);

router.post("/api/v1/auth/login", [   
  check('email', "Enter a valid email.").isEmail(),
  check('password', "Password should be at least 8 characters long.").isLength({ min: 8 })
  ], logInController);

module.exports = router;
