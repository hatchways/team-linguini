const express = require("express");
const router = express.Router();
const { hash, compare } = require('bcrypt');

router.use(express.json());
router.use(express.urlencoded({ extended: true}));
router.get("/welcome", function(req, res, next) {
  res.status(200).send({ welcomeMessage: "Step 1 (completed)" });
});

router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashedPassowrd = await hash(password, 10);
    console.log(hashedPassowrd)
  } catch (err) {
    console.log(err)
  }
})
module.exports = router;
