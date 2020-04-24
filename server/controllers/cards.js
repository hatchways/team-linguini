const Card = require('../models/Card');
const Column = require('../models/Column');
const {ErrorResponse} = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/asyncHandler');

//@Desc create a new card
//@Route POST /api/v1/cards
//@Access private
exports.createCard= asyncHandler(async (req, res, next) => {
    //Take the useId as the owner
    const owner = req.user._id;

    const {title, columnId, deadline, tags, comments, description, attachment, checklist, colorCode} = req.body;

    if (!title || !columnId){
        return next(new ErrorResponse('Title and columnId are required',403));
    }

    const column = await Column.findById(columnId);

    if (!column){
        return next(new ErrorResponse('Invalid column Id', 403))
    }

    const card = await Card.create(
        {title, owner, columnId, deadline, tags, comments, description, attachment, checklist, colorCode}
        );

    //Update the field cards[] on the column
    column.cards.push(card._id);
    await column.save();

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
    filter.owner = req.user._id;
    console.log(filter);

    const cards = await Card.find(filter);

    res.status(200).json({
        count: cards.length,
        cards: cards
    });
});

//@Desc update the card on field title
//@Route PUT /api/v1/cards/id
//@Access private
exports.updateCard= asyncHandler(async (req, res, next) => {
    console.log(req.body);
    let card = await Card.findOne({_id: req.params.id});
    
    if (!card) {
        return next(new ErrorResponse ('Invalid Card Id', 404));
    }

    if (card.owner.toString() !== req.user._id.toString()) {
        return next(new ErrorResponse('Not authorized to update card.', 401));
    }

    const newData = {};
    //Limit for the fields could be update
    ['title', 'columnId', 'deadline', 'tags', 'comments', 'description', 'attachment', 'colorCode', 'checklist'].forEach(field => {
        const value = req.body[field];
        if (value) newData[field] = value;
    })
    card = await Card.findByIdAndUpdate(req.params.id, newData, {new: true});
    
    res.status(200).json(card);
});

//@Desc delete card
//@Route DELETE /api/v1/cards/id
// //@Access private (only for owner
exports.deleteCard= asyncHandler(async (req, res, next) => {
    const card = await Card.findById(req.params.id);

    if (!card) {
        return next(new ErrorResponse ('Invalid Card Id', 404));
    }

    if (card.owner.toString() !== req.user._id.toString()) {
        return next(new ErrorResponse('Not authorized to delete card.', 401));
    }

    const column = await Column.findById(card.columnId);
    column.cards = column.cards.filter(cardId => cardId.toString() !== card._id.toString());
    await column.save();

    await Card.findByIdAndDelete(req.params.id)

    //delete card on the field "cards" of the belonged board

    res.status(200).json({message: 'Delete the card successfully.'});
});

