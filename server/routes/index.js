const express = require("express");
const router = express.Router();

//Route Files
var authRouter = require('../routes/authRoutes.js');

router.get("/welcome", function(req, res, next) {
  res.status(200).send({ welcomeMessage: "Step 1 (completed)" });
});

router.post("/api/v1/auth/register", authRouter);

router.post("/api/v1/auth/login", authRouter);

module.exports = router;
