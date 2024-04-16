import { isValidObjectId } from "mongoose";
import mongoose from 'mongoose';
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Todo } from "../models/todo.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const updateTodo = asyncHandler(async (req, res) => {
  const { todoId } = req.params;
  const { title, description, isDone } = req.body;
  if (!isValidObjectId(todoId)) {
    throw new ApiError(400, "invalid todoId");
  }
  const todo = await Todo.findById(todoId);
  if (!todo) {
    throw new ApiError(400, "invalid todoId");
  }
  const updatedTodo = await Todo.findByIdAndUpdate(
    todoId,
    {
      $set: {
        title,
        description,
        isDone,
      },
    },
    {
      new: true,
    }
  );
  if (!updatedTodo) {
    throw new ApiError(500, "intrenal error while updating todo");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, updateTodo, "updated todo successfully"));
});
const deleteTodo = asyncHandler(async (req, res) => {
  const { todoId } = req.params;
  if (!isValidObjectId(todoId)) {
    throw new ApiError(400, "invalid todoId");
  }
  const todo = await Todo.findById(todoId);
  if (!todo) {
    throw new ApiError(400, "invalid todoId");
  }
  const deletedTodo = await Todo.findByIdAndDelete(todoId);
  if (!deletedTodo) {
    throw new ApiError(500, "intrenal error while deleting todo");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "deleted todo successfully"));
});
const createTodo = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  const todo = await Todo.findOne({ title: title });
  if (todo) {
    throw new ApiError(400, "todo with the title already exists");
  }
  const newTodo = await Todo.create({
    owner: req.user._id,
    title: title,
    description: description,
  });
  if (!newTodo) {
    throw new ApiError(500, "internal error while creating new todo");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, newTodo, "new Todo created successfully"));
});
const listAllTodos = asyncHandler(async (req, res) => {
  const allTodo = await Todo.aggregate([
    {
      $match: new mongoose.Types.ObjectId(req.user?._id),
    },
  ]);
  if (allTodo.length === 0) {
    throw new ApiError(400, "no todos are created yet");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, allTodo, "all todos are fetched successfully"));
});
export { updateTodo, listAllTodos, createTodo, deleteTodo };
