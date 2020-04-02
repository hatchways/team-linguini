const router = require('express').Router();
const {createColumn} = require('../controllers/column')

router
    .route('/')
    .post(createColumn);


module.exports = router;