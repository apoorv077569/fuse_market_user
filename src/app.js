import express from "express";
import cors from 'cors';
import userRouter from "./routes/user.routes.js";
import qrRoute from "./routes/qr.routes.js";
import sectionRouter from "./routes/section.routes.js";
import authRoute from "./routes/auth.routes.js";
import passwordRoute from "./routes/password.routes.js";
import answerRouter from "./routes/answer.routes.js";
const app = express();
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}));

app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true,limit:"16kb"}));
app.use(express.static("public"));
app.use("/api/auth",authRoute);
app.use("/api/user",userRouter);
app.use("/api",qrRoute);
app.use("/api",sectionRouter);
app.use("/api/password",passwordRoute)
app.use("/api",answerRouter);

export default app;