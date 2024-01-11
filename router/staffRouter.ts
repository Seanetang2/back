import { Router } from "express";
import { createStaff } from "../controller/staffController";

const router: Router = Router();

router.route("/create-staff/:projectID").post(createStaff);

export default router;
