import {Router} from "express";
import { verifyJwt } from "../middlewares/logout.js";
import { addComment, deleteComment, updateComment } from "../controllers/commentController.js";

const router = Router();

router.route("/add").post(verifyJwt, addComment);

router.route("/update").patch(verifyJwt, updateComment);

router.route("/delete").delete(verifyJwt, deleteComment);

export  default router;