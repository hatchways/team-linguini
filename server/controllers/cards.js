const Card = require('../models/Card');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/asyncHandler');

//Return User Id from the req object
const getUserId = req => '';

//@Desc create a new card
//@Route POST /api/v1/cards
//@Access private
exports.createCard= asyncHandler(async (req, res, next) => {
    //Take the useId as the owner
    const owner = getUserId(req);

    const {title, columnId, orderOnColumn, deadline, tags, comments, description, attachment} = req.body;

    if (!title || !columnId){
        return next(new ErrorResponse('Title and columnId are required',403));
    }

    const card = await Card.create(
        {title, owner, columnId, orderOnColumn, deadline, tags, comments, description, attachment}
        );

    res.status(200).json(card);
});

//@Desc get a single card
//@Route GET /api/v1/cards/id
//@Access private
exports.getSingleCard= asyncHandler(async (req, res, next) => {
    const card = await Card.findOne({_id: req.params.id});

    if (!card) {
        return next(new ErrorResponse('Invalid object id', 404));
    }

    res.status(200).json(card);
});

//@Desc get all cards with filter from query
//@Route GET /api/v1/cards/id
//@Access private
exports.getCards= asyncHandler(async (req, res, next) => {
    const filter = {...req.query};
    filter.owner = getUserId();
    console.log(filter);

    const cards = await Card.find(filter);

    res.status(200).json({
        count: cards.length,
        cards: cards
    });
});

//@Desc update the card on field title or orderOnBoard
//@Route PUT /api/v1/cards/id
//@Access private
exports.updateCard= asyncHandler(async (req, res, next) => {

    let card = await Card.findOne({_id: req.params.id});

    if (!card) {
        return next(new ErrorResponse ('Invalid Card Id', 404));
    }

    if (card.owner.toString() !== getUserId(req)) {
        return next(new ErrorResponse('Not authorized to update card.', 401));
    }

    const newData = {};
    //Limit for the fields could be update
    ['title', 'columnId', 'orderOnColumn', 'deadline', 'tags', 'comments', 'description', 'attachment'].forEach(field => {
        const value = req.params[field];
        if (value) newData[field] = value;
    })

    card = await Card.findByIdAndUpdate(req.params.id, newData, {new: true});

    res.status(200).json(card);
});

//@Desc delete card
//@Route DELETE /api/v1/cards/id
// //@Access private (only for owner
// exports.deleteCard= async (req, res, next) => {
//     const card = await Card.findById(req.params.id);
//
//     if (!card) {
//         return next(new ErrorResponse ('Invalid Course Id', 404));
//     }
//
//     if (card.owner.toString() !== getUserId(req)) {
//         return next(new ErrorResponse('Not authorized to update course.', 401));
//     }
//
//     await Card.findByIdAndDelete(req.params.id)
//
//     //delete card on the field "cards" of the belonged board
//
//     res.status(200).json({message: 'Delete the card successfully.'});
// };

