import { Router } from "express";
import { loginUser, registerUser, logoutUser, refreshToken } from "../controllers/user.controller.js";
import upload from "../middlewares/multer.js"
import { verifyJwt } from "../middlewares/logout.js";

const router = Router();

router.route("/register").post(upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverImage", maxCount: 1 }
]), registerUser);

router.route("/login").post( loginUser );

router.route("/logout").post( verifyJwt, logoutUser );

router.route("/refresh-token").post( refreshToken)

export default router;