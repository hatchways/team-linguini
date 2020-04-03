const Board = require('../models/Board');

/*Create new board for the new account*/
exports.initializeFirstBoard = async function (userObjectId) {
    //Create a new board
    const board = await Board.create({title: 'My board', owner: userObjectId})

    //Create new columns 'in progress' and 'completed'

    //Return
    return true;
}

//Return User Id from the req object
const getUserId = req => '';

//@Desc create a new board
//@Route POST /api/v1/boards
//@Access private
exports.createBoard = async (req, res, next) => {
    //Take the useId as the owner
    const owner = getUserId(req);
    const {title} = req.body;

    const board = await Board.create({title, owner});

    res.status(200).json(board);
};