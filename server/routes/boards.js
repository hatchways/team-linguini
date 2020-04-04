const router = require('express').Router();
const {createBoard} = require('../controllers/boards');
const {createColumn} = require('../controllers/column');

router
    .route('/')
    .post(createBoard);

router.get('/:id/columns', (req, res, next) => {
    res.redirect('/api/v1/columns?boardId='+req.params.id);
});

router.post('/:id/columns', (req, res, next) => {
    req.body.boardId = req.params.id;
    createColumn(req, res, next);
})


module.exports = router;