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

router.get('/:id/cards', (req, res, next) => {
    res.redirect('/api/v1/cards?columnId='+req.params.id);
})

module.exports = router;