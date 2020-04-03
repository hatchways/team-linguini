const router = require('express').Router();
const {createCard, getSingleCard, getCards, updateCard} = require('../controllers/cards')

router
    .route('/')
    .get(getCards)
    .post(createCard);

router
    .route('/:id')
    .get(getSingleCard)
    .put(updateCard);



module.exports = router;