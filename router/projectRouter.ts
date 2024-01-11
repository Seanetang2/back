import { Router } from "express";
import {
  createProject,
  getOneProject,
  getProjectTask,
  getProjects,
} from "../controller/projectController";

const router: Router = Router();

router.route("/create-project/:userID").post(createProject);
router.route("/view-projects/:userID").get(getProjects);
router.route("/view-one-project/:projectID").get(getOneProject);
router.route("/view-project-task/:projectID").get(getProjectTask);

export default router;
