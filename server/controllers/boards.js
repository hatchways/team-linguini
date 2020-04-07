const Board = require('../models/Board');
const Column = require('../models/Column');
const User = require('../models/Users');
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
        return new ErrorResponse(e.message, 500)
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

//@Desc get a selected board of the user
//@Route GET /api/v1/boards/selected
//@Access private
exports.getSelectedBoard = asyncHandler(async (req, res, next) => {

    const board = await Board.findById(req.user.selectedBoard);

    res.status(200).json(board);
});