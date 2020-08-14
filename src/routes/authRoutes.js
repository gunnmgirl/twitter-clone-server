import express from "express";
import { body } from "express-validator/check";

import User from "../Models/userModel";
import authController from "../controllers/authController";

const router = express.Router();

router.put(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((user) => {
          if (user) {
            return Promise.reject("Email already exists!");
          }
        });
      }),
    body("password")
      .trim()
      .isLength({ min: 5 })
      .withMessage("Must be at least 5 characters long"),
    body("name")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Must be at least 3 characters long")
      .custom((value, { req }) => {
        return User.findOne({ name: value }).then((user) => {
          if (user) {
            return Promise.reject("Username already exists!");
          }
        });
      }),
  ],
  authController.signup
);

router.post("/login", authController.login);

export default router;
