const Board = require('../models/Board');
const Column = require('../models/Column');

/*Create new board for the new account*/
exports.initializeFirstBoard = async function (userObjectId) {
    //Create a new board
    const board = await Board.create({title: 'My board', owner: userObjectId})

    //Create new columns 'in progress' and 'completed'
    const column1 = await Column.create({title: "In progress", boardId: board._id});
    const column2 = await Column.create({title: "Completed", boardId: board._id});

    board.columns = [column1._id, column2._id];
    await board.save();

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