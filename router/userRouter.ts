import { Router } from "express";
import {
  createBremoUser,
  createPremoUser,
  createUser,
  getOneUser,
  signinUser,
  upgradeBremo,
  upgradePremo,
  verifyUser,
} from "../controller/userController";

const router: Router = Router();

router.route("/create-user").post(createUser);
router.route("/create-bremo-user").post(createBremoUser);
router.route("/create-premo-user").post(createPremoUser);
router.route("/upgrade-premo").post(upgradePremo);
router.route("/upgrade-bremo").post(upgradeBremo);
router.route("/verify-user").patch(verifyUser);
router.route("/sign-in-user").patch(signinUser);
router.route("/get-one-user/:userID").get(getOneUser);

export default router;
