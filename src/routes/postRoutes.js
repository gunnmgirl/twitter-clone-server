import express from "express";
import { body } from "express-validator/check";

import postController from "../controllers/postController";
import isAuth from "../middleware/isAuth";

const router = express.Router();

router.put("/create", isAuth, postController.createPost);
router.get("/", isAuth, postController.getPosts);
router.post("/delete", isAuth, postController.deletePost);

export default router;
