import express from "express";
import { body } from "express-validator/check";

import userController from "../controllers/userController";
import isAuth from "../middleware/isAuth";

const router = express.Router();

router.get("/", isAuth, userController.getUser);

export default router;
