import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';


const app = express();

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(express.static("public"));

app.use(cookieParser());

import authRoute from './routes/authRoutes.js';
import userRoute from './routes/userRoutes.js';
import videoRoute from './routes/videoRoutes.js';


app.use("/api/v1/user", userRoute)
app.use("/api/v1/auth", authRoute)
app.use("/api/v1/video", videoRoute)

export { app };