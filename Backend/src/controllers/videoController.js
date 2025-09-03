import { Video } from "../models/videos.js"
import { User } from "../models/User.js"
import { uploadFile } from "../utils/uploadFile.js";
import { v2 as cloudinary } from "cloudinary";


const uploadVideo = async (req,res) => {


   try {
     const { title, description, isPublic, tags, category } = req.body;
     const owner = req.user._id;
 
     if(!title || !owner){
         return res.status(400).json({
            success: false,
            message: "Title and owner are required"
     })
    }
 
     const videoPath = req.files?.video[0]?.path;
     const thumbnailPath = req.files?.thumbnail[0]?.path;
 
     if(!videoPath || !thumbnailPath){
         return res.status(400).json({
            success: false,
            message: "Video & thumbnail files are required"
        })
     }

       // Upload both files concurrently
      const [videoFile, thumbnailFile] = await Promise.all([
      uploadFile(videoPath, "video"),
      uploadFile(thumbnailPath, "image")
    ]);

     if(!videoFile || !thumbnailFile){
        return res.status(500).json({
            success: false,
            message:"Error in uploding Video files"
        })
            
     }

     const video = await Video.create({
        title,
        owner,
        tags,
        category,
        description,
        isPublic,
        video:{
            url: videoFile.secure_url,
            public_id: videoFile.public_id
        },

        thumbnail:{
             url: thumbnailFile.secure_url,
            public_id: thumbnailFile.public_id

        },

     })

     res.status(201).json({ 
        success: true, 
        message: "Video Upload Sucessfully", video
    })
 
   } catch (error) {
    return res.status(500).json({
        success: false,
        message: " Video Uploading is failed "+ error.message
    })
    
   }

}

const deleteVideo = async (req,res) => {

try {
      const { videoId } = req.params;
      const user = req.user._id;

      const video = await Video.findById(videoId)

      if (!video) {
        return res.status(404).json({
            success: false,
            message:"Video not  found"})
      }

      if (!user) {
        return res.status(401).json({
            success: false,
            message:"Not loggedIn"
        })
      }

    //   check owner

      if(user.toString() !== video.owner.toString()){
        return res.status(403).json({
            success: false,
            message:"you are not the owner of this video, so can not be deleted"
        })
      }

    //   delete from cloudinary(video & thumbnail)

      if(video.video?.public_id) {
        await cloudinary.uploader.destroy(video.video?.public_id, {resource_type: "video" })
      }else{
        return res.status(404).json({
        success: false,
        message: "unable to delet video"})
        
      }

      if(video.thumbnail?.public_id) {
        await cloudinary.uploader.destroy(video.thumbnail?.public_id, {resource_type: "image" })
      }else{
        return res.status(404).json({
        success: false,
        message: "unable to delet thubnail"})
        
      }

    // delete from dataBase

    await Video.findByIdAndDelete(videoId)

    // delete from watchHistroy

    await User.updateMany(
        { watchHistory: videoId},
        { $pull: { watchHistory: videoId} }
    )

    return res.status(200).json({
        success: true,
        message: "Video delete Sucessfully"
    })
      

    
} catch (error) {
    return res.status(500).json({
        success: false,
        message: "Unable to delete video" +  error.message
    })
    
}

}

const randomHomeVideos = async (req,res) => {


  try {
    const count = parseInt(req.query.count) || 5
    const videos = await Video.aggregate([
      {$match: { isPublic: true }},
      {$sample:{ size: count }}
    ])
    return res.status(200).json({ videos })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "can not find video" + error.message
    })
    
  }

  

}

export { uploadVideo , deleteVideo, randomHomeVideos }