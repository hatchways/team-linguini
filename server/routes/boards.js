const router = require('express').Router();
const {createBoard, getInit, getSingleBoard, getBoards, deleteBoard, updateBoard} = require('../controllers/boards');
const {createColumn} = require('../controllers/column');
const {isAuthenticated} = require('../middlewares/authorization')

router.use(isAuthenticated);

router
    .post('/', createBoard)
    .get('/', getBoards)
    .get('/init', getInit);

router
    .route('/:id')
    .get(getSingleBoard)
    .put(updateBoard)
    .delete(deleteBoard);

router
    .route('/:id/columns')
    .get((req, res, next) => res.redirect('/api/v1/columns?boardId='+req.params.id))
    .post((req, res, next) => {
        req.body.boardId = req.params.id;
        createColumn(req, res, next);
    })


module.exports = router;