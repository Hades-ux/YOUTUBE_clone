import { Router } from "express";
import { UpdateUserEmail, 
         UpdateUserFullName, 
         UpdateUserAvatar, 
         UpdateUserCoverImage, 
         deleteUser, ownerProfile, 
         userProfile } from "../controllers/user.controller.js";
import upload from "../middlewares/multer.js"
import { verifyJwt } from "../middlewares/logout.js";

const router = Router();

router.route("/delete").delete(verifyJwt, deleteUser)

router.route("/me").get( verifyJwt, ownerProfile )

router.route("/other/:id").get( userProfile )

router.route("/updateEmail").patch( verifyJwt, UpdateUserEmail );

router.route("/updateFullname").patch( verifyJwt, UpdateUserFullName );

router.route("/updateCoverImage").patch( verifyJwt,upload.single("coverImage"), UpdateUserCoverImage );

router.route("/updateAvatarImage").patch( verifyJwt,upload.single("avatar"), UpdateUserAvatar );

export default router;