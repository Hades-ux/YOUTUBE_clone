import { User } from "../models/User.js";
import { uploadImage } from "../utils/uploadImage.js";

const ownerProfile = async (req, res) =>{
  try{

    const user = await User.findById(req.user?._id)

    return res.status(200).json({ user, message: "User fetched successfully" });

  }catch(error){
    return res.status(500).json({ error: error.message || "Internal server error" });
  }
}

const userProfile = async (req, res) =>{
  try{

    const user = await User.findById(req.user?._id)

    return res.status(200).json({ user, message: "User fetched successfully" });

  }catch(error){
    return res.status(500).json({ error: error.message || "Internal server error" });
  }
}

const UpdateUser = async (req, res) => {
  try{

    const { fullName, email } = req.body;

    if(!fullName || !email){
      throw new Error("Full Name and Email are required");
    }

    const user = await User.findByIdAndUpdate(req.user?._id,
      { $set:{ fullName, email } },{ new: true }).select("-password");

  return res.status(200).json({ user, message: "User details updated successfully" });

  }catch(error){
    return res.status(500).json({ error: error.message || "Internal server error" });
  }
}

const UpdateUserAvatar = async (req, res) =>{

  try {

    const newAvatarPath = req.file?.path;

    if (!newAvatarPath) {
      return res.status(400).json({ error: "Avatar is required" });
    }

    const newAvatar = await uploadImage(newAvatarPath);

    if(!newAvatar.secure_url || !newAvatar.public_id){
      throw new Error("Avatar upload failed");
    }

    //  find user

    const user = await User.findById(req.user._id);
      if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    // delete old avatar

    if(user.avatar && user.avatar.public_id){
        await deleteOldImage(user.avatar.public_id);
    }

    const updatedUser = await User.findByIdAndUpdate(req.user._id, { $set:{ avatar: { url: newAvatar.secure_url, public_id: newAvatar.public_id } } },{ new: true }).select("-password");

    return res.status(200).json({ message: "Avatar updated successfully", user: updatedUser });

  } catch (error) {
    return res.status(500).json({ error: error.message || "Internal server error" });
  }

}

const UpdateUserCoverImage = async (req, res) =>{

  try {

    const newCoverImagePath = req.file?.path;

    if (!newCoverImagePath) {
      return res.status(400).json({ error: "Cover image is required" });
    }

    const newCoverImage = await uploadImage(newCoverImagePath);

     if(!newCoverImage.secure_url || !newCoverImage.public_id){
      throw new Error("Cover image upload failed");
    }

     const user = await User.findById(req.user._id);
      if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

     if(user.coverImage && user.coverImage.public_id){
      await deleteOldImage(user.coverImage.public_id);
    }

    const updatedUser = await User.findByIdAndUpdate(req.user?._id, { $set:{ coverImage: { url: newCoverImage.secure_url, public_id: newCoverImage.public_id } } },{ new: true }).select("-password");

    return res.status(200).json({ message: "Cover image updated successfully", user: updatedUser });

  } catch (error) {
    return res.status(500).json({ error: error.message || "Internal server error" });
  }

}

const deleteUser = async (req, res) =>{
  try{
    await User.findByIdAndDelete(req.user?._id)
    return res.status(200).json({ message: "User deleted successfully" });
  }catch(error){
    return res.status(500).json({ error: error.message || "Internal server error" });
  }
}

export { ownerProfile, userProfile, UpdateUser, UpdateUserAvatar, UpdateUserCoverImage, deleteUser };