import express from "express";
import { qrScan } from "../controllers/qr.controller.js";

const qrRoute = express.Router();

qrRoute.get("/scan/:token",qrScan);

export default qrRoute;