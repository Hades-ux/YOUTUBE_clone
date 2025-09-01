import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

import dotenv from "dotenv";

dotenv.config({
    path: "./.env"
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const uploadFile = async (filePath, fileType = "auto") => {
  try {
    if (!filePath) {
      throw new Error("No file path provided");
    }

    let folder = "Uploads"; // default folder

  // Choose folder based on file type
  if (fileType === "image") folder = "Images";
  else if (fileType === "video") folder = "Videos";
  else if (fileType === "audio") folder = "Audio"; 

    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: fileType,folder,
    });

    return result;
  } catch (error) {
    throw new Error("Error uploading image: " + error.message);
  } finally{
     if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

  }
};

export { uploadFile };
