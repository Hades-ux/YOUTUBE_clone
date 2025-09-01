import {Router} from "express";
import upload from "../middlewares/multer.js";
import { verifyJwt } from "../middlewares/logout.js";
import { changePassword,
         forgotPassword,
         refreshToken, 
         loginUser, 
         logoutUser, 
         registerUser } from "../controllers/authController.js";

const router = Router();

router.route("/register").post(upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverImage", maxCount: 1 }
]), registerUser);

router.route("/login").post( loginUser );

router.route("/logout").post( verifyJwt, logoutUser );

router.route("/forgot/password").post( forgotPassword );

router.route("/update/password").post( verifyJwt, changePassword );

router.route("/refreshToken").post( refreshToken );

export default router;