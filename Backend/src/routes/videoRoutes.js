import { Router} from "express"
import upload from "../middlewares/multer.js";
import { verifyJwt } from "../middlewares/logout.js";
import { deleteVideo, getVideoById, randomHomeVideos, uploadVideo } from "../controllers/videoController.js";

const router = Router();

router.route("/upload").post(verifyJwt, upload.fields([
    {name: "video", maxCount: 1},
    {name: "thumbnail", maxCount: 1}
]), uploadVideo)

router.route("/delete/:id").delete(verifyJwt, deleteVideo)

router.route("/random").get(randomHomeVideos)

router.route("/:id").get(getVideoById)

export default router