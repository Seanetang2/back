import { Router } from "express";
import { createTask, getOneTask, getTasks } from "../controller/taskController";

const router: Router = Router();

router.route("/create-task/:userID/:projectID").post(createTask);
router.route("/get-tasks/:userID").get(getTasks);
router.route("/get-one-tasks").get(getOneTask);

export default router;
