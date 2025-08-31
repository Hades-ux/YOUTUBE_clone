import { v2 as cloudinary } from "cloudinary";

import dotenv from "dotenv";

dotenv.config({
    path: "./.env"
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const deleteOldImage = async (publicId) =>{
    try {
        const result = await cloudinary.uploader.destroy(publicId, { resource_type: "image"});

         if (result.result === "ok" || result.result === "not found") {
          return  res.status(200).json({ success: true, message: "Image deleted (or already missing)", result });
        } else {
            throw new Error("Failed to delete image");
        }
    } catch (error) {
         throw new Error("Error deleting image: " + error.message);
    }
}

export default deleteOldImage;