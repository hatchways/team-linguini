const Column = require("../models/Column");
const Board = require("../models/Board");
const { ErrorResponse } = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/asyncHandler");

//Return User Id from the req object
const getUserId = (req) => req.user._id;

//@Desc create a new board without cards
//@Route POST /api/v1/columns
//@Access private
exports.createColumn = asyncHandler(async (req, res, next) => {
  //Take the useId as the owner
  const owner = getUserId(req);

  const { title, boardId } = req.body;
  const cards = []; //Column is empty

  if (!title || !boardId) {
    return next(new ErrorResponse("Title and boardId are required", 403));
  }

  const board = await Board.findById(boardId);

  if (!Board) {
    return next(new ErrorResponse("Invalid board Id", 403));
  }

  const column = await Column.create({ title, owner, boardId, cards });

  //Update the field columns[] on the board
  board.columns.push(column._id);
  await board.save();

  res.status(200).json(column);
});

//@Desc get a single columns
//@Route GET /api/v1/columns/id
//@Access private
exports.getSingleColumn = asyncHandler(async (req, res, next) => {
  const column = await Column.findOne({ _id: req.params.id });

  if (!column) {
    return next(new ErrorResponse("Invalid object id", 404));
  }

  res.status(200).json(column);
});

//@Desc get all columns with filter from query
//@Route GET /api/v1/columns/id
//@Access private
exports.getColumns = asyncHandler(async (req, res, next) => {
  const filter = { ...req.query };
  filter.owner = getUserId(req);

  const columns = await Column.find(filter); //.populate('cards');

  res.status(200).json({
    count: columns.length,
    columns: columns,
  });
});

//@Desc update the column on field title or orderOnBoard
//@Route PUT /api/v1/columns/id
//@Access private
exports.updateColumn = asyncHandler(async (req, res, next) => {
  let column = await Column.findOne({ _id: req.params.id });

  if (!column) {
    return next(new ErrorResponse("Invalid Column Id", 404));
  }

  if (column.owner.toString() !== getUserId(req)) {
    return next(new ErrorResponse("Not authorized to update the column.", 401));
  }

  const newData = {};
  //Limit for the fields could be update
  ["title", "cards", "boardId"].forEach((field) => {
    const value = req.body[field];
    if (value) newData[field] = value;
  });

  column = await Column.findByIdAndUpdate(req.params.id, newData, {
    new: true,
  });

  res.status(200).json(column);
});

// @Desc delete column
// @Route DELETE /api/v1/columns/id
//@Access private (only for owner
exports.deleteColumn = asyncHandler(async (req, res, next) => {
  const column = await Column.findById(req.params.id);

  if (!column) {
    return next(new ErrorResponse("Invalid Column Id", 404));
  }

  if (column.owner.toString() !== getUserId(req)) {
    return next(new ErrorResponse("Not authorized to delete column.", 401));
  }

  await Column.findByIdAndDelete(req.params.id);

  //delete column on the field "columns" of the belonged board

  res.status(200).json({ message: "Delete the column successfully." });
});
