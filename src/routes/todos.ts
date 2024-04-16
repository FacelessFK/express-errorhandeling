import Express from "express";
import { createTask, getTask, updateTask } from "../controllers/tasks";

const router = Express.Router();

router.route("/tasks/new-task").post(createTask);
router.route("/tasks/:id").get(getTask).patch(updateTask);

export default router;
