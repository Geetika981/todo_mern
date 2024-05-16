import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  updateTodo,
  createTodo,
  deleteTodo,
  listAllTodos,
} from "../controllers/todo.controller.js";
import { Router } from "express";
const router = Router();
router.route("/create").post(verifyJWT, createTodo);
router.route("/all-todo").get(verifyJWT, listAllTodos);

router
  .route("/:todoId")
  .patch(verifyJWT, updateTodo)
  .delete(verifyJWT, deleteTodo);


export default router;
