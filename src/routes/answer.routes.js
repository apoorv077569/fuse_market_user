import express from "express";
import { submitAnswer } from "../controllers/answer.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const answerRouter = express.Router();
answerRouter.post("/user/answer/submit",verifyToken,submitAnswer);

export default answerRouter;