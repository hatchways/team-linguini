const router = require('express').Router();
const {createColumn, getColumns, updateColumn, getSingleColumn} = require('../controllers/column')

router
    .route('/')
    .get(getColumns)
    .post(createColumn);

router
    .route('/:id')
    .get(getSingleColumn)
    .put(updateColumn);

module.exports = router;