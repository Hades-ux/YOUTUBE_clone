import Video from "../models/videos"
import { uploadFile } from "../utils/uploadFile";

const uploadVideo = async (req,res) =>{


   try {
     const { title, description, isPublic, tags, category } = req.body;
     const owner = req.user._id;
 
     if(!title || !owner){
         throw new Error("Title and owner are required")
     }
 
     const videoPath = req.files?.video[0]?.path;
     const thumbnailPath = req.files?.thumbnail[0]?.path;
 
     if(!videoPath || !thumbnailPath){
         throw new Error("Video & thumbnail files are required")
     }

     const videoFile = await uploadFile(videoPath, "video");
     const thumbnailFile = await uploadFile(thumbnailPath, "image");

     if(!videoFile || !thumbnailFile){
        throw new Error("Error in uploding Video files")
            
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

     res.status(201).json({message: "Video Upload Sucessfully", video})
 
   } catch (error) {
    return res.status(500).json({
        message: " Video Uploading is failed "+ error.message
    })
    
   }

}

export { uploadVideo }