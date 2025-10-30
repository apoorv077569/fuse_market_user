import { getSection,questionBySection } from "../controllers/section.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";
import express from "express";

const sectionRouter = express.Router();

sectionRouter.get("/sections",getSection);
sectionRouter.get("/section/:id/question",questionBySection);
export default sectionRouter;