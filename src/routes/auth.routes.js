import { login } from "../controllers/auth.controller.js";
import express from "express";

const authRoute = express.Router();
authRoute.post("/login",login);

export default authRoute;