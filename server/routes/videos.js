import express from "express";
import { addVideo, addView, deleteVideo, getByTag, getVideo, random, search, sub, trend, updateVideo } from "../controllers/video.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.post("/",verifyToken,addVideo);

router.put("/:id",verifyToken,updateVideo);

router.delete("/:id",verifyToken,deleteVideo);

router.get("/find/:id",getVideo);

router.put("/view/:id",addView);//to update the views while watching a video
//verify token is used to verify the current user with the operation he needed to be performed
//look carefully to increase views if we use the verify token then it means only he can add the views of his
//only videos uploaded if we use (req.user.id !== video.userId) else if we we wanted to increase views only if
//he is logged in then dont use that line thats it... (here we are not considereing anything even if he is logged
//in or not we increase the views functionality)

router.get("/trend",trend);

router.get("/random",random);

router.post("/sub",verifyToken,sub);

router.get("/tags",getByTag);

router.get("/search",search);

export default router;