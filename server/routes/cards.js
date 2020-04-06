const router = require('express').Router();
const {createCard, getSingleCard, getCards, updateCard, deleteCard} = require('../controllers/cards')

router
    .route('/')
    .get(getCards)
    .post(createCard);

router
    .route('/:id')
    .get(getSingleCard)
    .put(updateCard)
    .delete(deleteCard);



module.exports = router;