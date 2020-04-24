const express = require("express");
const router = express.Router();
const { uploadAvatar, updateUser } = require("../controllers/users");
const { isAuthenticated } = require("../middlewares/authorization");

router.use(isAuthenticated);

router.post("/uploadAvatar", uploadAvatar).put("/update", updateUser);

module.exports = router;
