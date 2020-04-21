const express = require("express");
const router = express.Router();
const {uploadAvatar} = require('../controllers/users')
const {isAuthenticated} = require('../middlewares/authorization')


router.post('/api/v1/users/uploadAvatar', isAuthenticated, uploadAvatar)

module.exports = router;
