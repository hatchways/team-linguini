const router = require('express').Router();
const {createColumn, getColumns, updateColumn, getSingleColumn, deleteColumn} = require('../controllers/column')

router
    .route('/')
    .get(getColumns)
    .post(createColumn);

router
    .route('/:id')
    .get(getSingleColumn)
    .put(updateColumn)
    .delete(deleteColumn);

router.get('/:id/cards', (req, res, next) => {
    res.redirect('/api/v1/cards?columnId='+req.params.id);
})

module.exports = router;