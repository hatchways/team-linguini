const Column = require('../models/Column')

//Return User Id from the req object
const getUserId = req => '';

//@Desc create a new board without cards
//@Route POST /api/v1/columns
//@Access private
exports.createColumn= async (req, res, next) => {
    //Take the useId as the owner
    const owner = getUserId(req);

    const {title, boardId, orderOnBoard} = req.body;
    const cards = []; //Column is empty

    const column = await Column.create({title, owner, boardId, orderOnBoard, cards});

    res.status(200).json(column);
};
