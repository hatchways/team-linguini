const express = require("express");
const { hash, compare } = require('bcryptjs');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');
const { registerController } = require('../controllers/auth.js')

const router = express.Router();

router.get("/welcome", function(req, res, next) {
  res.status(200).send({ welcomeMessage: "Step 1 (completed)" });
});

router.post("/register", registerController);
module.exports = router;
