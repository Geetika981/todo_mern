import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  updateTodo,
  createTodo,
  deleteTodo,
  listAllTodos,
} from "../controllers/todo.controller.js";
import { Router } from "express";
const router = Router();
router
  .route("/:todoId")
  .post(verifyJWT, updateTodo)
  .delete(verifyJWT, deleteTodo);

router.route("/create").post(verifyJWT,createTodo);
router.route("/all-todo").get(verifyJWT,listAllTodos);

export default router;
