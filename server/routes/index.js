const express = require("express");
const router = express.Router();
const uploadFileToS3 = require('../middlewares/uploadFileToS3')
const {isAuthenticated} = require('../middlewares/authorization')


router.post('/api/v1/users/uploadAvatar', isAuthenticated, uploadFileToS3)

module.exports = router;
