const Board = require('../models/Board');
const Column = require('../models/Column');
const User = require('../models/Users');
const Card = require('../models/Card');
const asyncHandler = require('../middlewares/asyncHandler');
const { ErrorResponse} = require('../utils/errorResponse');

/*Create new board for the new account*/
exports.initializeFirstBoard = async (userObjectId) => {

    try {
        //Create a new board
        const board = await Board.create({title: 'My board', owner: userObjectId})

        //Create new columns 'in progress' and 'completed'
        const column1 = await Column.create({title: "In progress", boardId: board._id, owner: userObjectId});
        const column2 = await Column.create({title: "Completed", boardId: board._id, owner: userObjectId});

        board.columns = [column1._id, column2._id];
        await board.save();

        const user = await User.findById(userObjectId);
        user.selectedBoard = board._id;
        user.boards = [board._id];

        await user.save();

        //Return
        return board._id;
    } catch (e) {
        // return new ErrorResponse(e.message, 500)
        return ;
    }
}

//Return User Id from the req object
const getUserId = req => req.user._id;

//@Desc create a new board
//@Route POST /api/v1/boards
//@Access private
exports.createBoard = asyncHandler(async (req, res, next) => {
    //Take the useId as the owner
    const owner = getUserId(req);
    const {title} = req.body;

    const board = await Board.create({title, owner});

    res.status(200).json(board);
});

//@Desc get all initial information for dashboard page
//@Route GET /api/v1/boards/init
//@Access private
exports.getInit = asyncHandler(async (req, res, next) => {

    const output = {};

    if (req.user.selectedBoard) {
        output.boards = req.user.boards;
        output.selectedBoard = req.user.selectedBoard;
    } else {
        const boardId = await initializeFirstBoard(req.user._id);
        output.boards = [boardId];
        output.selectedBoard = boardId;
    }

    //Get columns of the selected board
    const board = await Board.findById(output.selectedBoard).populate('columns');

    const columnOrder = output.columnOrder = [];
    const outputCards = output.cards = {};
    const outputColumns = output.columns = {};

    for (let i=0; i< board.columns.length; i++) {
        const column = board.columns[i];
        column.owner = undefined;
        column.__v = undefined;
        column.createAt = undefined;

        //Save column to output
        const columnId = column._id.toString();
        columnOrder.push(columnId);

        outputColumns[columnId] = column;

        //Get all cards of the column and save to output
        const cards = await Card.find({columnId: column._id}).select('-__v -owner -createAt');
        cards.forEach(card => outputCards[(card._id)] = card);
    }

    res.status(200).json(output);
});